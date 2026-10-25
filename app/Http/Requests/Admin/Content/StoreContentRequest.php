<?php

namespace App\Http\Requests\Admin\Content;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreContentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            /*
            |--------------------------------------------------------------------------
            | Scope
            |--------------------------------------------------------------------------
            */

            'scope' => [
                'required',
                Rule::in([
                    'global',
                    'assessment',
                    'category',
                ]),
            ],

            /*
            |--------------------------------------------------------------------------
            | Assessment & Category
            |--------------------------------------------------------------------------
            */

            'assessment_type_id' => [
                'nullable',
                'exists:assessment_types,id',
            ],

            'category_id' => [
                'nullable',
                'exists:assessment_categories,id',
            ],

            /*
            |--------------------------------------------------------------------------
            | Basic Content
            |--------------------------------------------------------------------------
            */

            'title' => [
                'required',
                'string',
                'max:255',
                'unique:contents,title',
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

            /*
            |--------------------------------------------------------------------------
            | Article Content
            |--------------------------------------------------------------------------
            */

            'content' => [
                'nullable',
                'string',
            ],

            /*
            |--------------------------------------------------------------------------
            | PDF
            |--------------------------------------------------------------------------
            */

            'pdf' => [
                'nullable',
                'file',
                'mimes:pdf',
                'max:10240',
            ],

            /*
            |--------------------------------------------------------------------------
            | Media URL
            |--------------------------------------------------------------------------
            */

            'media_url' => [
                'nullable',
                'string',
                'max:2048',
            ],

            /*
            |--------------------------------------------------------------------------
            | Learning Info
            |--------------------------------------------------------------------------
            */

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

            /*
            |--------------------------------------------------------------------------
            | Status
            |--------------------------------------------------------------------------
            */
            'thumbnail' => [
    'nullable',
    'image',
    'mimes:jpg,jpeg,png,webp',
    'max:2048',
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

            'scope.required' =>
                'Scope content wajib dipilih.',

            'scope.in' =>
                'Scope content tidak valid.',

            'title.required' =>
                'Judul content wajib diisi.',

            'title.unique' =>
                'Judul content sudah digunakan.',

            'assessment_type_id.exists' =>
                'Assessment tidak valid.',

            'category_id.exists' =>
                'Kategori tidak valid.',

            'pdf.file' =>
                'File yang diupload harus berupa file.',

            'pdf.mimes' =>
                'File harus berformat PDF.',

            'pdf.max' =>
                'Ukuran PDF maksimal 10 MB.',

            'estimated_time.required' =>
                'Estimasi waktu wajib diisi.',

            'estimated_time.integer' =>
                'Estimasi waktu harus berupa angka.',

            'estimated_time.min' =>
                'Estimasi waktu minimal 1 menit.',
        ];
    }
}
