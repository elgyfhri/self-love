<?php

namespace App\Http\Requests\Admin\Tag;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTagRequest extends FormRequest
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
                'string',
                'max:100',
            ],

            'slug' => [
                'required',
                'string',
                'max:100',
                'alpha_dash',
                Rule::unique('tags', 'slug')
                    ->ignore($this->tag->id),
            ],
            'tags' => [
                'nullable',
                'array',
            ],

            'tags.*' => [
                'exists:tags,id',
            ],
        ];
    }
}