<?php

namespace App\Console\Commands;

use App\Models\UserAssessment;
use App\Services\Assessment\Factory\AssessmentStrategyFactory;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class RecalculateAssessmentScoresCommand extends Command
{
    protected $signature = 'assessments:recalculate
                            {--type= : Batasi ke satu kode assessment, misal SCS}
                            {--all : Hitung ulang semua assessment yang sudah selesai}';

    protected $description = 'Hitung ulang skor assessment yang sudah selesai memakai strategy yang aktif';

    public function handle(AssessmentStrategyFactory $factory): int
    {
        /*
         * Baris perubahan dicetak di atas progress bar, supaya tidak
         * tertimpa oleh bar yang sedang berjalan.
         */
        $query = UserAssessment::query()
            ->with('assessmentType')
            ->where('status', 'completed');

        if ($type = $this->option('type')) {
            $query->whereHas(
                'assessmentType',
                fn ($builder) => $builder->where('code', $type)
            );
        } elseif (! $this->option('all')) {
            $this->components->error(
                'Pilih --type=<KODE> atau --all agar tidak salah menjangkau data.'
            );

            return self::FAILURE;
        }

        $assessments = $query->orderBy('id')->get();

        if ($assessments->isEmpty()) {
            $this->components->info('Tidak ada assessment selesai yang perlu dihitung ulang.');

            return self::SUCCESS;
        }

        $bar = $this->output->createProgressBar($assessments->count());
        $bar->start();

        $changed = 0;

        foreach ($assessments as $assessment) {

            $strategy = $factory->make($assessment->assessmentType->scoring_type);

            $result = $strategy->calculate($assessment);

            $before = $assessment->total_score;

            /*
             * Baris hasil lama dihapus dulu supaya kategori yang
             *.question gone tidak menumpuk. Nilai per kategori tidak
             * berubah di sini, tapi tetap ditulis ulang supaya satu
             * sumber kebenaran untuk kolom score, level, dan label.
             */
            DB::transaction(function () use ($assessment, $result) {

                $assessment->results()->delete();

                foreach ($result['results'] as $item) {
                    $assessment->results()->create($item);
                }

                $assessment->update([
                    'total_score' => $result['total_score'],
                    'final_result' => $result['final_result'] ?? null,
                ]);
            });

            if ((float) $before !== (float) $result['total_score']) {
                $changed++;
            }

            /*
             * |--------------------------------------------------------------------------
             * | Laporkan per baris
             * |--------------------------------------------------------------------------
             * |
             * | Angka lama dan baru ditampilkan supaya perubahan
             * | riwayat bisa ditinjau, bukan hanya dihapus begitu saja.
             * |
             */

            if ((float) $before !== (float) $result['total_score']) {
                $this->line(sprintf(
                    '  #%d  %s  %.2f -> %.2f',
                    $assessment->id,
                    $assessment->assessmentType->code,
                    (float) $before,
                    (float) $result['total_score']
                ));
            }

            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);

        $this->components->info(
            sprintf(
                '%d assessment selesai, %d berubah totalnya.',
                $assessments->count(),
                $changed
            )
        );

        return self::SUCCESS;
    }
}
