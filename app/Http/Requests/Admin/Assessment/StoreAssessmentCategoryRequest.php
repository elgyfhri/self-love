<?php

namespace App\Http\Requests\Admin\Assessment;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAssessmentCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    
        public function rules(): array
{
    return [
        'name' => [
            'required',
            'max:255',
            Rule::unique('assessment_categories', 'name'),
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
