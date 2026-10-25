<?php

namespace App\Services\Assessment\Contracts;

use App\Models\UserAssessment;

interface AssessmentStrategy
{
    public function calculate(UserAssessment $assessment): array;
}