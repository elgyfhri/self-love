<?php

namespace App\Http\Requests\Admin\Assessment;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreQuestionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'assessment_type_id' => [
                'required',
                'exists:assessment_types,id',
            ],

           'category_id' => [
                'nullable',
                'exists:assessment_categories,id',
            ],

            'question' => [
                'required',
                'string',
            ],

            'question_code' => [
                'required',
                'string',
                'max:100',
                'alpha_dash',
                'unique:questions,question_code',
            ],

            'question_order' => [
                'required',
                'integer',
                'min:1',
            ],

            'answer_type' => [
                'required',
                Rule::in([
                    'likert_5',
                    'multiple_choice',
                    'boolean',
                ]),
            ],

            'is_reverse' => [
                'boolean',
            ],

            'is_required' => [
                'boolean',
            ],

            'is_active' => [
                'boolean',
            ],
        ];
    }
}