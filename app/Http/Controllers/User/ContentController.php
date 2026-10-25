<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Content;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class ContentController extends Controller
{
    /**
     * Semua learning content
     */
    public function index(Request $request)
    {
        $contents = Content::with([
            'assessmentType',
            'category',
        ])
            ->where('status', 'published')
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('excerpt', 'like', "%{$search}%")
                      ->orWhere('content', 'like', "%{$search}%")
                      ->orWhere('tag', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(8)
            ->withQueryString();

        return Inertia::render(
            'Learning/Index',
            [
                'contents' => $contents,
                'filters' => [
                    'search' => $request->search,
                ],
            ]
        );
    }

    /**
     * Detail learning content
     */
 public function show(Request $request, Content $content)
{
    abort_if(
        $content->status !== 'published',
        404
    );

    $content->load([
        'assessmentType',
        'category',
    ]);

    if ($content->media_url) {
        $content->media_url = $request->getSchemeAndHttpHost().Storage::url($content->media_url);
    }

    $relatedContents = Content::with([
        'assessmentType',
        'category',
    ])
        ->where('status', 'published')
        ->where('id', '!=', $content->id)
        ->when(
            $content->category_id,
            function ($query) use ($content) {
                $query->where(
                    'category_id',
                    $content->category_id
                );
            }
        )
        ->latest()
        ->take(3)
        ->get();

    return Inertia::render(
        'Learning/Show',
        [
            'content' => $content,
            'relatedContents' => $relatedContents,
        ]
    );
}
}