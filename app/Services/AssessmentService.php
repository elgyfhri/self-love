<?php

namespace App\Services;

use App\Models\User;
use App\Models\Question;
use App\Models\Content;
use App\Models\AssessmentType;
use App\Models\UserAssessment;
use App\Models\QuestionOption;
use Illuminate\Support\Facades\DB;
use App\Services\Assessment\Factory\AssessmentStrategyFactory;

class AssessmentService
{
    public function __construct(
        protected AssessmentStrategyFactory $factory
    ) {
    }

    public function getWorkflow(AssessmentType $assessmentType): array
{
    $assessmentType->loadCount([
        'categories',
    ]);

    /*
    |--------------------------------------------------------------------------
    | Count Questions
    |--------------------------------------------------------------------------
    */

   $questionCount = Question::where(
    'assessment_type_id',
    $assessmentType->id
)->count();


    /*
    |--------------------------------------------------------------------------
    | Count Contents
    |--------------------------------------------------------------------------
    |
    | JANGAN DIUBAH.
    | Content tetap menggunakan relasi category seperti sebelumnya.
    |
    */

   $contentCount = Content::where(function ($query) use ($assessmentType) {

    // Content khusus Assessment
    $query->where('assessment_type_id', $assessmentType->id);

    // Content khusus Category dari Assessment tersebut
    $query->orWhere(function ($q) use ($assessmentType) {
        $q->whereNotNull('category_id')
            ->whereHas(
                'category.assessmentTypes',
                function ($categoryQuery) use ($assessmentType) {
                    $categoryQuery->where(
                        'assessment_types.id',
                        $assessmentType->id
                    );
                }
            );
    });

})->count();


    /*
    |--------------------------------------------------------------------------
    | Check Question Options
    |--------------------------------------------------------------------------
    */

    $questionWithoutOptions = Question::where(
    'assessment_type_id',
    $assessmentType->id
)
->get()
->filter(function ($question) {

    return match ($question->answer_type) {

        'likert_5'
            => $question->options()->count() !== 5,

        'boolean'
            => $question->options()->count() !== 2,

        'multiple_choice'
            => $question->options()->count() < 2,

        default => true,
    };

})
->count();


    /*
    |--------------------------------------------------------------------------
    | Workflow
    |--------------------------------------------------------------------------
    */

    $workflow = [

        'basic_information' => true,

        'category' => $assessmentType->categories_count > 0,
        'category_count' => $assessmentType->categories_count,

        'question' => $questionCount > 0,
        'question_count' => $questionCount,

        'question_option' =>
            $questionCount > 0 &&
            $questionWithoutOptions === 0,

        'content' => $contentCount > 0,
        'content_count' => $contentCount,

    ];


    $workflow['can_publish'] = collect($workflow)
        ->except('basic_information')
        ->every(fn ($item) => $item);

    return $workflow;
} 
    public function publish(
        AssessmentType $assessmentType
    ): AssessmentType {

        $workflow = $this->getWorkflow($assessmentType);

        if (! $workflow['can_publish']) {
            throw new \Exception(
                'Assessment belum lengkap.'
            );
        }

        $assessmentType->update([
            'status' => 'published',
        ]);

        return $assessmentType->fresh();
    }

    public function submit(
        User $user,
        AssessmentType $assessmentType,
        array $answers
    ): UserAssessment {

        if ($assessmentType->status !== 'published') {
            abort(403, 'Assessment is not published.');
        }

        return DB::transaction(function () use (
            $user,
            $assessmentType,
            $answers
        ) {

            $userAssessment = UserAssessment::create([
                'user_id' => $user->id,
                'assessment_type_id' => $assessmentType->id,
                'status' => 'draft',
                'started_at' => now(),
            ]);

            foreach ($answers as $questionId => $optionId) {

   $option = QuestionOption::where('id', $optionId)
    ->where('question_id', $questionId)
    ->firstOrFail();

    $userAssessment->answers()->create([
        'question_id'        => $questionId,
        'question_option_id' => $option->id,
        'answer_text'        => $option->option_text,
    ]);
}

            $strategy = $this->factory->make(
                $assessmentType->scoring_type
            );

            $result = $strategy->calculate($userAssessment);

            foreach ($result['results'] as $item) {
                $userAssessment->results()->create($item);
            }

            $userAssessment->update([
                'total_score' => $result['total_score'],
                'final_result' => $result['final_result'] ?? null,
                'status' => 'completed',
                'completed_at' => now(),
            ]);

            $user->update([
                'last_assessment_at' => now(),
            ]);

            return $userAssessment->fresh([
                'results.category',
                'assessmentType',
            ]);
        });
    }
}