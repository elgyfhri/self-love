<?php

namespace App\Http\Requests\Admin\Assessment;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAssessmentCategoryRequest extends FormRequest
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
        'name' => [
            'required',
            'max:255',
            Rule::unique('assessment_categories', 'name')
        ->ignore($this->route('assessment_category')->id),
    ],

    'indonesian_name' => [
        'nullable',
        'max:255',
    ],

        'abbreviation' => [
            'nullable',
            'max:10',
        ],

        'description' => [
            'nullable',
        ],

        'assessment_type_ids' => [
            'required',
            'array',
            'min:1',
        ],

        'assessment_type_ids.*' => [
            'exists:assessment_types,id',
        ],
    ];
}
}
