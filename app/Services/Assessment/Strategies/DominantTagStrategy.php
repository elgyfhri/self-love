<?php

namespace App\Services\Assessment\Strategies;

use App\Models\UserAssessment;
use App\Services\Assessment\Contracts\AssessmentStrategy;

class DominantTagStrategy implements AssessmentStrategy
{
    public function calculate(UserAssessment $assessment): array
    {
        $answers = $assessment->answers()
            ->with([
                'question.category',
                'questionOption',
            ])
            ->get();

        $tagCounts = [];

        foreach ($answers as $answer) {

            $tag = $answer->questionOption?->option_value;

            if ($tag === null || $tag === '') {
                continue;
            }

            if (!isset($tagCounts[$tag])) {
                $tagCounts[$tag] = 0;
            }

            $tagCounts[$tag]++;
        }

        if (empty($tagCounts)) {
            return [
                'total_score' => 0,
                'final_result' => null,
                'results' => [],
            ];
        }

        arsort($tagCounts);

        $dominantTag = array_key_first($tagCounts);
        

        return [
            'total_score' => $tagCounts[$dominantTag],

            'final_result' => $dominantTag,

            'results' => [
                [
                    'category_id' => null,
                    'score' => $tagCounts[$dominantTag],
                    'value' => $dominantTag,
                    'level' => null,
                    'recommendation' => null,
                ],
            ],
        ];
    }
}