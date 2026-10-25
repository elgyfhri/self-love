<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DearLittleMe;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DearLittleMeController extends Controller
{
    /**
     * Semua surat dari seluruh user.
     */
    public function index(Request $request)
    {
        $letters = DearLittleMe::with('user')
            ->when($request->search, function ($query) use ($request) {
                $query->where('title', 'like', "%{$request->search}%")
                    ->orWhere('letter', 'like', "%{$request->search}%")
                    ->orWhereHas('user', function ($userQuery) use ($request) {
                        $userQuery->where('name', 'like', "%{$request->search}%");
                    });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Letters/Index', [
            'letters' => $letters,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

    /**
     * Detail surat.
     */
    public function show(DearLittleMe $letter)
    {
        $letter->load('user');

        return Inertia::render('Admin/Letters/Show', [
            'letter' => $letter,
        ]);
    }

    /**
     * Hapus surat.
     */
    public function destroy(DearLittleMe $letter)
    {
        $letter->delete();

        return redirect()
            ->route('admin.letters.index')
            ->with('success', 'Surat berhasil dihapus.');
    }
}