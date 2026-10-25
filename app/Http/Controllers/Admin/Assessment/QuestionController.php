<?php

namespace App\Http\Controllers\Admin\Assessment;

use App\Http\Requests\Admin\Assessment\StoreQuestionRequest;
use App\Http\Requests\Admin\Assessment\UpdateQuestionRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AssessmentType;
use App\Models\AssessmentCategory;
use App\Models\Question;

use Inertia\Inertia;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $questions = Question::query()
           
          ->with([
    'assessmentType',
    'category',
])
            ->when($request->search, function ($query) use ($request) {
                $query->where('question', 'like', "%{$request->search}%")
                    ->orWhere('question_code', 'like', "%{$request->search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Assessment/Questions/Index', [
            'questions' => $questions,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
public function create()
{
    $assessmentTypes = AssessmentType::orderBy('name')->get();

    $categories = AssessmentCategory::with('assessmentTypes')
        ->orderBy('name')
        ->get();

    return Inertia::render(
        'Admin/Assessment/Questions/Create',
        [
            'assessmentTypes' => $assessmentTypes,
            'categories'      => $categories,
        ]
    );
}   /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuestionRequest $request)
{
    Question::create($request->validated());

    return redirect()
        ->route('admin.assessment-questions.index')
        ->with('success', 'Question berhasil dibuat.');
}

    /**
     * Display the specified resource.
     */
  public function show(Question $assessmentQuestion)
{
   $assessmentQuestion->load([
    'assessmentType',
    'category',
    'options',
]);

    return Inertia::render('Admin/Assessment/Questions/Show', [
        'question' => $assessmentQuestion,
    ]);
}

    /**
     * Show the form for editing the specified resource.
     */
public function edit(Question $assessmentQuestion)
{
    $assessmentQuestion->load([
        'assessmentType',
        'category',
    ]);

    $assessmentTypes = AssessmentType::orderBy('name')->get();

    $categories = AssessmentCategory::with('assessmentTypes')
        ->orderBy('name')
        ->get();

    return Inertia::render(
        'Admin/Assessment/Questions/Edit',
        [
            'question' => $assessmentQuestion,
            'assessmentTypes' => $assessmentTypes,
            'categories' => $categories,
        ]
    );
}
    /**
     * Update the specified resource in storage.
     */
public function update(
    UpdateQuestionRequest $request,
    Question $assessmentQuestion
) {
    $assessmentQuestion->update($request->validated());

    return redirect()
        ->route('admin.assessment-questions.index')
        ->with('success', 'Question berhasil diperbarui.');
}
    /**
     * Remove the specified resource from storage.
     */
   public function destroy(Question $assessmentQuestion)
{
    if ($assessmentQuestion->answers()->exists()) {
        return back()->withErrors([
            'error' => 'Question sudah digunakan dan tidak dapat dihapus.'
        ]);
    }

    $assessmentQuestion->delete();

    return back()->with(
        'success',
        'Question berhasil dihapus.'
    );
}
}
