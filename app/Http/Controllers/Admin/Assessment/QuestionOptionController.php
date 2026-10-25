<?php

namespace App\Http\Controllers\Admin\Assessment;

use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\QuestionOption;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionOptionController extends Controller
{
    public function index(Question $assessmentQuestion)
    {
        return Inertia::render(
            'Admin/Assessment/QuestionOptions/Index',
            [
                'question' => $assessmentQuestion,
                'options' => $assessmentQuestion
                    ->options()
                    ->orderBy('option_order')
                    ->get()
            ]
        );
    }


    public function create(Question $assessmentQuestion)
    {
        return Inertia::render(
            'Admin/Assessment/QuestionOptions/Create',
            [
                'question' => $assessmentQuestion
            ]
        );
    }


   public function store(
    Request $request,
    Question $assessmentQuestion
) {
    $rules = [
        'option_text'  => 'required|string|max:255',
        'option_order' => 'required|integer|min:1',
    ];

    switch ($assessmentQuestion->answer_type) {
        case 'likert_5':
            $rules['option_value'] = 'required|integer|between:1,5';
            break;

        case 'boolean':
            $rules['option_value'] = 'required|integer|in:0,1';
            break;

        case 'multiple_choice':
            $rules['option_value'] = 'required|string';
            break;
    }

    $validated = $request->validate($rules);

    $assessmentQuestion->options()->create($validated);

    return redirect()->route(
        'admin.assessment-questions.show',
        $assessmentQuestion
    );
}


    public function destroy(
        Question $assessmentQuestion,
        QuestionOption $option
    ) {
        $option->delete();


        return back();
    }
}