<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubmitAssessmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }


    public function rules(): array
    {
        return [
            'answers' => [
                'required',
                'array',
                'min:1'
            ],

            'answers.*' => [
                'required',
                'integer',
                'exists:question_options,id'
            ],
        ];
    }


    public function messages(): array
    {
        return [
            'answers.required' => 'Jawaban wajib diisi.',
            'answers.array' => 'Format jawaban tidak valid.',
            'answers.*.exists' => 'Pilihan jawaban tidak ditemukan.',
        ];
    }
}