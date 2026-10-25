<?php

namespace App\Models;

use App\Support\ScoreLevel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AssessmentResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_assessment_id',
        'category_id',
        'score',
        'value',
        'level',
        'recommendation',
    ];

    protected $appends = [
        'level_label',
    ];

    /*
    |--------------------------------------------------------------------------
    | Level Label
    |--------------------------------------------------------------------------
    |
    | Kata level selalu dihitung ulang dari score memakai
    | config('assessment.levels'), bukan dibaca dari kolom level.
    |
    | Alasannya: kolom level ikut tersimpan kata lamanya ("Low",
    | "Moderate", "High") saat aturan range diubah, dan tidak ikut
    | terupdate untuk data yang sudah tersimpan.
    |
    */

    public function getLevelLabelAttribute(): ?string
    {
        /*
         * Baris dominant_tag tidak punya kategori, dan score-nya hanya
         * jumlah kemunculan tag, bukan skor 1-5.
         */
        if ($this->category_id === null) {
            return $this->level;
        }

        if ($this->score === null) {
            return null;
        }

        return ScoreLevel::label(
            (float) $this->score,
            $this->userAssessment?->assessmentType?->code
        );
    }

    public function userAssessment()
    {
        return $this->belongsTo(UserAssessment::class);
    }

    public function category()
    {
        return $this->belongsTo(AssessmentCategory::class);
    }
}