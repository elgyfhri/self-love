<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\AssessmentType;
use App\Models\Content;
use App\Models\DearLittleMe;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'users' => User::count(),
                'assessments' => AssessmentType::count(),
                'contents' => Content::count(),
                'letters' => DearLittleMe::count(),
            ],
        ]);
    }
}