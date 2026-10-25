<?php

namespace App\Services\Assessment\Factory;

use App\Services\Assessment\Contracts\AssessmentStrategy;
use App\Services\Assessment\Strategies\ScoreRangeStrategy;
use App\Services\Assessment\Strategies\ScreeningRangeStrategy;
use App\Services\Assessment\Strategies\DominantTagStrategy;
use InvalidArgumentException;

class AssessmentStrategyFactory
{
    public function make(string $scoringType): AssessmentStrategy
    {
        return match ($scoringType) {

            'score_range' => app(
                ScoreRangeStrategy::class
            ),

            'screening_range' => app(
                ScreeningRangeStrategy::class
            ),

            'dominant_tag' => app(
                DominantTagStrategy::class
            ),

            default => throw new InvalidArgumentException(
                "Scoring type '{$scoringType}' belum memiliki Strategy."
            ),
        };
    }
}