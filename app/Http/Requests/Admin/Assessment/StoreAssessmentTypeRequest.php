<?php

namespace App\Http\Requests\Admin\Assessment;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
class StoreAssessmentTypeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
{
    return [
        'name' => ['required', 'string', 'max:255'],

        'code' => [
            'required',
            'string',
            'max:100',
            'alpha_dash',
            Rule::unique('assessment_types', 'code'),
        ],
        'scoring_type' => ['required', 'in:score_range,screening_range,dominant_tag',],

        'description' => ['nullable', 'string'],

        'source' => ['nullable', 'string'],

        'purpose' => ['nullable', 'string'],

        'instructions' => ['nullable', 'string'],

        'thumbnail' => ['nullable', 'image', 'max:2048'],

        'estimated_time' => ['required', 'integer', 'min:1'],
    ];
}
}
