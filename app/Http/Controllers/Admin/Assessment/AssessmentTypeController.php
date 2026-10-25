<?php

namespace App\Http\Controllers\Admin\Assessment;

use App\Http\Controllers\Controller;
use App\Models\AssessmentType;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\Assessment\StoreAssessmentTypeRequest;
use App\Http\Requests\Admin\Assessment\UpdateAssessmentTypeRequest;
use App\Services\AssessmentService;
class AssessmentTypeController extends Controller
{
    public function index(Request $request)
{
    $assessmentTypes = AssessmentType::query()
        ->when($request->search, function ($query) use ($request) {
            $query->where('name', 'like', "%{$request->search}%")
                  ->orWhere('code', 'like', "%{$request->search}%");
        })
        ->latest()
        ->paginate(10)
        ->withQueryString();

    return Inertia::render('Admin/Assessment/Types/Index', [
        'assessmentTypes' => $assessmentTypes,
        'filters' => [
            'search' => $request->search,
        ],
    ]);
}

    public function create()
{
    return Inertia::render('Admin/Assessment/Types/Create');
}

    public function store(StoreAssessmentTypeRequest $request)
{
    $data = $request->validated();

    $data['status'] = 'draft';

    if ($request->hasFile('thumbnail')) {
        $data['thumbnail'] = $request
            ->file('thumbnail')
            ->store('assessment-types', 'public');
    }

    AssessmentType::create($data);

    return redirect()
        ->route('admin.assessment-types.index')
        ->with('success', 'Assessment berhasil dibuat.');
}

public function publish(
    AssessmentType $assessmentType,
    AssessmentService $assessmentService
) {
    $assessmentService->publish($assessmentType);

    return back()->with(
        'success',
        'Assessment berhasil dipublikasikan.'
    );
}

   public function show(
    AssessmentType $assessmentType,
    AssessmentService $assessmentService
) {
    $workflow = $assessmentService
        ->getWorkflow($assessmentType);

    return Inertia::render(
        'Admin/Assessment/Types/Show',
        [
            'assessmentType' => $assessmentType->loadCount([
    'categories'
]),
            'workflow' => $workflow,
        ]
    );
}

    public function edit(AssessmentType $assessmentType)
{
    return Inertia::render('Admin/Assessment/Types/Edit', [
        'assessmentType' => $assessmentType,
    ]);
}

//   public function update(
//     UpdateAssessmentTypeRequest $request,
//     AssessmentType $assessmentType
// ) {
//     dd(
//         $request->method(),
//         $request->all(),
//         $request->hasFile('thumbnail'),
//         $request->file('thumbnail')
//     );

//     $data = $request->validated();
// }

public function update(
    UpdateAssessmentTypeRequest $request,
    AssessmentType $assessmentType
) {
    $data = $request->validated();

    // Jika user mengunggah thumbnail baru
    if ($request->hasFile('thumbnail')) {
        // Hapus thumbnail lama jika ada (opsional)
        // if ($assessmentType->thumbnail) {
        //     Storage::disk('public')->delete($assessmentType->thumbnail);
        // }

        $data['thumbnail'] = $request
            ->file('thumbnail')
            ->store('assessment-types', 'public');
    } else {
        // Hapus key thumbnail agar gambar lama tidak tertimpa NULL
        unset($data['thumbnail']);
    }

    $assessmentType->update($data);

    return redirect()
        ->route('admin.assessment-types.index')
        ->with('success', 'Assessment berhasil diperbarui.');
}

   public function destroy(AssessmentType $assessmentType)
{
    if ($assessmentType->userAssessments()->exists()) {
    return back()->withErrors([
        'error' => 'Assessment sudah pernah digunakan dan tidak dapat dihapus.'
    ]);
}
    $assessmentType->delete();


    return back()->with(
        'success',
        'Assessment berhasil dihapus.'
    );
}
}