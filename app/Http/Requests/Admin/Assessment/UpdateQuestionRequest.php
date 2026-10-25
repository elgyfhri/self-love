<?php

namespace App\Http\Requests\Admin\Assessment;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateQuestionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category_id' => [
                'required',
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

               Rule::unique('questions', 'question_code')
    ->ignore($this->route('assessment_question')),
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