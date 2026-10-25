<?php

namespace App\Http\Requests\Admin\Assessment;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAssessmentTypeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],

            'code' => [
                'required',
                'string',
                'max:100',
                'alpha_dash',
                Rule::unique('assessment_types', 'code')
                    ->ignore($this->assessment_type),
            ],

            'description' => ['nullable', 'string'],

            'source' => ['nullable', 'string'],

            'purpose' => ['nullable', 'string'],

            'instructions' => ['nullable', 'string'],

            'thumbnail' => ['nullable', 'image', 'max:2048'],
            'scoring_type' => [
                'required',
                'in:score_range,screening_range,dominant_tag',
            ],

            'estimated_time' => ['required', 'integer', 'min:1'],
        ];
    }
}