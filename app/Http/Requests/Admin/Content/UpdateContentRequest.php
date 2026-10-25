<?php

namespace App\Http\Requests\Admin\Content;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateContentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'assessment_type_id' => [
                'nullable',
                'exists:assessment_types,id',
            ],

            'category_id' => [
                'nullable',
                'exists:assessment_categories,id',
            ],

            'title' => [
                'required',
                'string',
                'max:255',

               Rule::unique('contents', 'title')
                ->ignore($this->route('content')->id),
            ],

            'excerpt' => [
                'nullable',
                'string',
            ],

            'source' => [
                'nullable',
                'string',
                'max:5000',
            ],

            'type' => [
                'required',
                Rule::in([
                    'article',
                    'video',
                    'audio',
                    'worksheet',
                    'challenge',
                ]),
            ],

            'content' => [
                'nullable',
                'string',
            ],

            'media_url' => [
                'nullable',
                'string',
            ],

            'estimated_time' => [
                'required',
                'integer',
                'min:1',
            ],

            'difficulty' => [
                'required',
                Rule::in([
                    'beginner',
                    'intermediate',
                    'advanced',
                ]),
            ],
            'scope' => [
    'required',
    Rule::in([
        'global',
        'assessment',
        'category',
    ]),
],
'pdf' => [
    'nullable',
    'file',
    'mimes:pdf',
    'max:10240',
],
'thumbnail' => [
    'nullable',
    'image',
    'mimes:jpg,jpeg,png,webp',
    'max:5120',
],

            'status' => [
                'required',
                Rule::in([
                    'draft',
                    'published',
                    'archived',
                ]),
            ],
            'is_featured' => [
                'boolean',
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

    public function messages(): array
    {
        return [
            'title.required' => 'Judul content wajib diisi.',
            'title.unique' => 'Judul content sudah digunakan.',
        ];
    }
}