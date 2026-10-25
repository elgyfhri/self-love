<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubmitAssessmentRequest;
use App\Models\AssessmentType;
use App\Models\Question;
use App\Models\UserAssessment;
use App\Services\AssessmentService;
use App\Services\RecommendationService;
use Inertia\Inertia;

class AssessmentController extends Controller
{
    public function __construct(
        protected AssessmentService $assessmentService,
        protected RecommendationService $recommendationService
    ) {}

    /**
     * Daftar semua assessment
     */
    public function index()
    {
        $assessments = AssessmentType::with('categories')
            ->where('status', 'published')
            ->orderBy('name')
            ->get();

        return Inertia::render('Assessment/Index', [
            'assessments' => $assessments,
        ]);
    }

    /**
     * Halaman introduction
     */
    public function introduction(string $code)
    {
        $assessment = AssessmentType::with('categories')
            ->where('code', $code)
            ->where('status', 'published')
            ->firstOrFail();

        // Ambil ID category yang dimiliki assessment
        $categoryIds = $assessment->categories->pluck('id');

        // Hitung jumlah question berdasarkan category
        $questionsCount = Question::whereIn(
            'category_id',
            $categoryIds
        )->count();

        // Tambahkan jumlah question ke object assessment
        $assessment->setAttribute(
            'questions_count',
            $questionsCount
        );

        return Inertia::render(
            'Assessment/Show',
            [
                'assessment' => $assessment,
            ]
        );
    }

    /**
     * Mulai assessment
     */
    public function start(string $code)
    {
        $assessment = AssessmentType::with('categories')
            ->where('code', $code)
            ->where('status', 'published')
            ->firstOrFail();

        $questions = Question::where(
            'assessment_type_id',
            $assessment->id
        )
            ->where('is_active', true)
            ->with('options')
            ->orderBy('question_order')
            ->get();

        return Inertia::render('Assessment/Question', [
            'assessment' => $assessment,
            'questions' => $questions,
        ]);
    }

    /**
     * Submit jawaban
     */
    public function submit(
        SubmitAssessmentRequest $request,
        string $code
    ) {
        // Ambil jenis assessment berdasarkan code
        $assessmentType = AssessmentType::where('code', $code)
            ->where('status', 'published')
            ->firstOrFail();

        // Simpan jawaban & hitung hasil
        $userAssessment = $this->assessmentService->submit(
            auth()->user(),
            $assessmentType,
            $request->validated()['answers']
        );

        // Ambil rekomendas
        $recommendations = $this->recommendationService->recommend(
            $userAssessment->results
        );

        return Inertia::render('Assessment/Result', [
            'assessment' => $userAssessment,
            'recommendations' => $recommendations,
        ]);
    }

    /**
     * Riwayat assessment user
     */
    public function history()
    {
        $userAssessments = UserAssessment::with([
            'assessmentType',
            'results.category',
        ])
            ->where('user_id', auth()->id())
            ->where('status', 'completed')
            ->latest('completed_at')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Assessment/History', [
            'userAssessments' => $userAssessments,
        ]);
    }

    /**
     * Hasil assessment
     */
    public function result(UserAssessment $userAssessment)
    {
        $this->authorizeResult($userAssessment);

        $userAssessment->load([
            'assessmentType',
            'results.category',
        ]);

        $recommendations = $this->recommendationService->recommend(
            $userAssessment->results
        );

        return Inertia::render('Assessment/Result', [
            'assessment' => $userAssessment,
            'recommendations' => $recommendations,
        ]);
    }

    /**
     * Pastikan hasil yang dibuka memang milik user yang sedang login.
     */
    private function authorizeResult(UserAssessment $userAssessment): void
    {
        abort_if(
            $userAssessment->user_id !== auth()->id(),
            403
        );

        abort_if(
            $userAssessment->status !== 'completed',
            404
        );
    }
}
