<?php

namespace App\Http\Requests\Admin\Assessment;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreQuestionOptionRequest extends FormRequest
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

        'option_text' => [
            'required',
            'string',
            'max:255',
        ],

        'option_value' => [
            'required',
            'string',
            'max:100',
        ],

        'option_order' => [
            'required',
            'integer',
            'min:1',
        ],

        'is_active' => [
            'boolean',
        ],

    ];
}
}
