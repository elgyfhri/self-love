<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\DearLittleMe;
use App\Http\Requests\StoreLetterRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DearLittleMeController extends Controller
{
    /**
     * Daftar surat milik user yang sedang login.
     */
    public function index()
    {
        $letters = DearLittleMe::where('user_id', auth()->id())
            ->latest()
            ->get();

        $letterCount = $letters->count();

        return Inertia::render('DearLittleMe/Index', [
            'letters' => $letters,
            'letterCount' => $letterCount,
        ]);
    }

    /**
     * Tampilkan form menulis surat.
     */
    public function create()
    {
        return Inertia::render('DearLittleMe/Create');
    }

    /**
     * Simpan surat baru.
     */
    public function store(StoreLetterRequest $request)
    {
        DearLittleMe::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'letter' => $request->letter,
        ]);

        return redirect()
            ->route('letter.index')
            ->with('success', 'Surat berhasil disimpan.');
    }

    /**
     * Detail sebuah surat (milik user yang login).
     */
    public function show(DearLittleMe $letter)
    {
        $this->authorizeOwner($letter);

        return Inertia::render('DearLittleMe/Show', [
            'letter' => $letter,
        ]);
    }

    /**
     * Hapus surat.
     */
    public function destroy(DearLittleMe $letter)
    {
        $this->authorizeOwner($letter);

        $letter->delete();

        return redirect()
            ->route('letter.index')
            ->with('success', 'Surat berhasil dihapus.');
    }

    /**
     * Pastikan surat milik user yang sedang login.
     */
    private function authorizeOwner(DearLittleMe $letter)
    {
        abort_if(
            $letter->user_id !== auth()->id(),
            403
        );
    }
}