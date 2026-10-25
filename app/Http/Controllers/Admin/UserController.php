<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\StoreUserRequest;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
  public function index(Request $request)
{
    $users = User::with('roles')
        ->when($request->search, function ($query) use ($request) {
            $query->where('name', 'like', "%{$request->search}%")
                  ->orWhere('email', 'like', "%{$request->search}%");
        })
        ->paginate(10)
        ->withQueryString();

    return Inertia::render('Admin/Users/Index', [
        'users' => $users,
        'filters' => [
            'search' => $request->search,
        ],
    ]);
}
public function create()
{
    return Inertia::render('Admin/Users/Create', [
        'roles' => Role::all(),
    ]);
}
public function store(StoreUserRequest $request)
{
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    $user->assignRole($request->role);

    return redirect()
        ->route('admin.users.index')
        ->with('success', 'User berhasil dibuat.');
}

public function show(User $user)
{
    $user->load([
    'roles',
    'assessments.assessmentType',
    'assessments.results.category',
]);

    return Inertia::render('Admin/Users/Show', [
        'user' => $user,
    ]);
}

public function edit(User $user)
{
    return Inertia::render('Admin/Users/Edit', [
        'user' => $user->load('roles'),
        'roles' => Role::all(),
    ]);
}
public function update(UpdateUserRequest $request, User $user)
{
    $user->update([
        'name' => $request->name,
        'email' => $request->email,
    ]);

    $user->syncRoles($request->role);

    return redirect()
        ->route('admin.users.index')
        ->with('success', 'User berhasil diperbarui.');
}
public function destroy(User $user)
{
    if ($user->hasRole('superadmin')) {
        return back()->withErrors([
            'error' => 'Superadmin tidak dapat dihapus.'
        ]);
    }
    if ($user->id === auth()->id()) {
    return back()->withErrors([
        'error' => 'Anda tidak dapat menghapus akun sendiri.'
    ]);
}

    $user->delete();

    return back()->with(
        'success',
        'User berhasil dihapus.'
    );
}}