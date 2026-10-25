<?php

namespace App\Http\Controllers\Admin\Assessment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AssessmentCategory;
use App\Models\AssessmentType;
use Inertia\Inertia;
use App\Http\Requests\Admin\Assessment\StoreAssessmentCategoryRequest;
use App\Http\Requests\Admin\Assessment\UpdateAssessmentCategoryRequest;

class AssessmentCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index(Request $request)
{
    $categories = AssessmentCategory::query()
        ->with('assessmentTypes')
        ->withCount('questions')
        ->when($request->search, function ($query) use ($request) {
            $query->where('name', 'like', "%{$request->search}%")
                  ->orWhere('abbreviation', 'like', "%{$request->search}%")
                  ->orWhereHas('assessmentTypes', function ($q) use ($request) {
                      $q->where('name', 'like', "%{$request->search}%");
                  });
        })
        ->latest()
        ->paginate(10)
        ->withQueryString();

    return Inertia::render('Admin/Assessment/Categories/Index', [
        'categories' => $categories,
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
    return Inertia::render('Admin/Assessment/Categories/Create', [
        'assessmentTypes' => AssessmentType::where('status', 'draft')
            ->orWhere('status', 'published')
            ->orderBy('name')
            ->get(),
    ]);
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAssessmentCategoryRequest $request)
{
    $data = $request->validated();

$category = AssessmentCategory::create([
    'name' => $data['name'],
    'indonesian_name' => $data['indonesian_name'] ?? null,
    'abbreviation' => $data['abbreviation'],
    'description' => $data['description'],
]);

$category->assessmentTypes()->sync($data['assessment_type_ids']);

    return redirect()
        ->route('admin.assessment-categories.index')
        ->with(
            'success',
            'Category berhasil dibuat.'
        );
}

    /**
     * Display the specified resource.
     */
   public function show(AssessmentCategory $assessmentCategory)
{
    $assessmentCategory->load([
        'assessmentTypes',
        'questions',
    ])->loadCount([
        'questions',
        'contents',
    ]);

    return Inertia::render(
        'Admin/Assessment/Categories/Show',
        [
            'category' => $assessmentCategory,
        ]
    );
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(
    AssessmentCategory $assessmentCategory
) {
    $assessmentCategory->load('assessmentTypes');

    return Inertia::render(
        'Admin/Assessment/Categories/Edit',
        [
            'assessmentCategory' => $assessmentCategory,
            'assessmentTypes' => AssessmentType::orderBy('name')->get(),
        ]
    );
}

    /**
     * Update the specified resource in storage.
     */
   public function update(
    UpdateAssessmentCategoryRequest $request,
    AssessmentCategory $assessmentCategory
) {
    $data = $request->validated();

    $assessmentCategory->update([
        'name' => $data['name'],
        'indonesian_name' => $data['indonesian_name'] ?? null,
        'abbreviation' => $data['abbreviation'],
        'description' => $data['description'],
    ]);

    $assessmentCategory
        ->assessmentTypes()
        ->sync($data['assessment_type_ids']);

    return redirect()
        ->route('admin.assessment-categories.index')
        ->with(
            'success',
            'Category berhasil diperbarui.'
        );
}

    /**
     * Remove the specified resource from storage.
     */
   public function destroy(
    AssessmentCategory $assessmentCategory
) {

    if ($assessmentCategory->questions()->exists()) {

        return back()->withErrors([
            'error' => 'Category sudah memiliki question dan tidak dapat dihapus.'
        ]);

    }

    $assessmentCategory->delete();

    return back()->with(
        'success',
        'Category berhasil dihapus.'
    );
}
}
