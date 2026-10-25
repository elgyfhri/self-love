<?php

namespace App\Http\Controllers\Admin\Assessment ;

use App\Http\Requests\Admin\Content\StoreContentRequest;
use App\Http\Requests\Admin\Content\UpdateContentRequest;
use App\Models\Tag;
use App\Http\Controllers\Controller;
use App\Models\AssessmentCategory;
use App\Models\AssessmentType;
use Illuminate\Support\Facades\Storage;
use App\Models\Content;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ContentController extends Controller
{
 public function index()
{
    $contents = Content::with([
        'assessmentType',
        'category',
    ])
    ->latest()
    ->paginate(10);

    return Inertia::render(
        'Admin/Assessment/Contents/Index',
        [
            'contents' => $contents
        ]
    );
}

  public function create()
{
    return Inertia::render(
        'Admin/Assessment/Contents/Create',
        [
            'assessmentTypes' => AssessmentType::orderBy('name')->get(),

            'categories' => AssessmentCategory::with(
                'assessmentTypes'
            )->orderBy('name')->get(),

            'tags' => Tag::orderBy('name')->get(),
        ]
    );
}

public function store(StoreContentRequest $request)
{
    $data = $request->validated();

    $tags = $data['tags'] ?? [];

    unset($data['tags']);

    $data['slug'] = Str::slug($data['title']);

    if ($data['scope'] === 'global') {
        $data['assessment_type_id'] = null;
        $data['category_id'] = null;
    }

    if ($data['scope'] === 'assessment') {
        $data['category_id'] = null;
    }

    if (
        $data['type'] === 'article' &&
        $request->hasFile('pdf')
    ) {
        $path = $request->file('pdf')->store(
            'contents/pdf',
            'public'
        );

        $data['media_url'] = $path;
        $data['content'] = null;
    }
    if ($request->hasFile('thumbnail')) {
    $data['thumbnail'] = $request
        ->file('thumbnail')
        ->store('contents/thumbnails', 'public');
}

    unset($data['scope']);
    unset($data['pdf']);

    $content = Content::create($data);

    $content->tags()->sync($tags);

    return redirect()
        ->route('admin.contents.index')
        ->with(
            'success',
            'Content berhasil ditambahkan.'
        );
}
    public function show(Content $content)
    {
        return Inertia::render(
            'Admin/Assessment/Contents/Show',
            [
                'content' => $content->load([
                    'assessmentType',
                    'category',
                ]),
            ]
        );
    }

    public function storeTag(Request $request)
{
    $request->validate([
        'name' => [
            'required',
            'string',
            'max:100',
            'unique:tags,name',
        ],
    ]);

    $tag = Tag::create([
        'name' => $request->name,
        'slug' => Str::slug($request->name),
    ]);

    return response()->json([
        'tag' => $tag,
    ]);
}

   public function edit(Content $content)
{
    $content->load('tags');

    return Inertia::render(
        'Admin/Assessment/Contents/Edit',
        [
            'content' => $content,

            'assessmentTypes' => AssessmentType::orderBy('name')->get(),

            'categories' => AssessmentCategory::with(
                'assessmentTypes'
            )->orderBy('name')->get(),

            'tags' => Tag::orderBy('name')->get(),
        ]
    );
}

public function update(
    UpdateContentRequest $request,
    Content $content
) {
    $data = $request->validated();

    // =====================================================
    // TAGS
    // =====================================================

    $tags = $data['tags'] ?? [];

    unset($data['tags']);

    // =====================================================
    // SLUG
    // =====================================================

    $data['slug'] = Str::slug(
        $data['title']
    );

    // =====================================================
    // SCOPE
    // =====================================================

    if ($data['scope'] === 'global') {

        $data['assessment_type_id'] = null;
        $data['category_id'] = null;

    } elseif ($data['scope'] === 'assessment') {

        $data['category_id'] = null;
    }

    unset($data['scope']);

    // =====================================================
    // PDF
    // =====================================================

    unset($data['pdf']);

    // =====================================================
    // THUMBNAIL
    // =====================================================

    if ($request->hasFile('thumbnail')) {

        // Hapus thumbnail lama
        if (
            $content->thumbnail &&
            Storage::disk('public')->exists(
                $content->thumbnail
            )
        ) {
            Storage::disk('public')->delete(
                $content->thumbnail
            );
        }

        // Upload thumbnail baru
        $data['thumbnail'] =
            $request
                ->file('thumbnail')
                ->store(
                    'contents/thumbnails',
                    'public'
                );
    }

    // =====================================================
    // CONTENT
    // =====================================================

    if (
        $data['type'] === 'article'
    ) {
        /*
        |--------------------------------------------------
        | Jika artikel menggunakan EditorJS
        |--------------------------------------------------
        */

        if (
            !empty($data['content'])
        ) {
            $data['media_url'] = null;
        }
    }

    // =====================================================
    // UPDATE
    // =====================================================

    $content->update($data);

    // =====================================================
    // TAGS
    // =====================================================

    $content->tags()->sync($tags);

    // =====================================================
    // REDIRECT
    // =====================================================

    return redirect()
        ->route('admin.contents.index')
        ->with(
            'success',
            'Content berhasil diperbarui.'
        );
}
    public function destroy(Content $content)
    {
        $content->delete();

        return back();
    }
    public function uploadImage(Request $request)
{
    $request->validate([
        'image' => [
            'required',
            'image',
            'mimes:jpg,jpeg,png,webp,gif',
            'max:5120',
        ],
    ]);

    $path = $request->file('image')->store(
        'contents/images',
        'public'
    );

    return response()->json([
        'success' => 1,
        'file' => [
            'url' => Storage::url($path),
        ],
    ]);
}
public function updatePdf(Request $request, Content $content)
{
    $request->validate([
        'pdf' => [
            'nullable',
            'file',
            'mimes:pdf',
            'max:10240',
        ],
    ]);

    if ($request->hasFile('pdf')) {

        // Hapus PDF lama jika ada
        if (
            $content->media_url &&
            Storage::disk('public')->exists(
                $content->media_url
            )
        ) {
            Storage::disk('public')->delete(
                $content->media_url
            );
        }

        // Upload PDF baru
        $path = $request
            ->file('pdf')
            ->store(
                'contents/pdf',
                'public'
            );

        // SIMPAN PATH YANG SAMA SEPERTI CREATE
        $content->media_url = $path;
    }

    // Karena menggunakan PDF,
    // EditorJS dikosongkan
    $content->content = null;

    $content->type = 'article';

    $content->save();

    return redirect()
        ->route('admin.contents.index')
        ->with(
            'success',
            'PDF berhasil diperbarui.'
        );
}
}