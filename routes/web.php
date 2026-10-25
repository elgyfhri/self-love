<?php

use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\User\AssessmentController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DearLittleMeController as AdminDearLittleMeController;
use App\Http\Controllers\User\ContentController as UserContentController;
use App\Http\Controllers\User\DearLittleMeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\Assessment\AssessmentTypeController;
use App\Http\Controllers\Admin\Assessment\AssessmentCategoryController;
use App\Http\Controllers\Admin\Assessment\QuestionController;
use App\Http\Controllers\Admin\Assessment\QuestionOptionController;
use App\Http\Controllers\Admin\Assessment\ContentController;
use App\Http\Controllers\LearningController;
use App\Models\AssessmentType;
use App\Models\Content;



/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/
Route::middleware([
    'auth',
    'role:admin|superadmin',
])->prefix('admin')
  ->name('admin.')
  ->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');
    Route::resource('users', UserController::class);
    Route::resource('assessment-types', AssessmentTypeController::class);
    Route::patch(
    'assessment-types/{assessmentType}/publish',
    [AssessmentTypeController::class, 'publish']
)->name('assessment-types.publish');
    Route::resource('assessment-categories', AssessmentCategoryController::class);
    Route::resource('assessment-questions', QuestionController::class);
    Route::resource('assessment-questions.options', QuestionOptionController::class);
    Route::resource('contents', ContentController::class);
    Route::post(
    'contents/{content}/update-pdf',
    [ContentController::class, 'updatePdf']
)->name('contents.update-pdf');
    Route::post(
    'contents/tags',
    [ContentController::class, 'storeTag']
)->name('contents.tags.store');

    Route::get('/letters', [AdminDearLittleMeController::class, 'index'])
        ->name('letters.index');
    Route::get('/letters/{letter}', [AdminDearLittleMeController::class, 'show'])
        ->name('letters.show');
    Route::delete('/letters/{letter}', [AdminDearLittleMeController::class, 'destroy'])
        ->name('letters.destroy');

});
Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard
    Route::get('/dashboard', function () {

    $contents = Content::with(['assessmentType', 'category'])
    ->where('status', 'published')
    ->latest()
    ->take(4)
    ->get();

    $assessments = AssessmentType::with('categories')
    ->where('status', 'published')
    ->orderBy('name')
    ->get();

    return Inertia::render('Dashboard', [
        'contents' => $contents,
        'assessments' => $assessments,
    ]);

})->name('dashboard');
     Route::get('/assessments', [AssessmentController::class, 'index'])
    ->name('assessments.index');

    /*
    | Route history & result harus daftar di atas /assessments/{code},
    | kalau tidak "history" akan dianggap sebagai kode assessment.
    */
    Route::get('/assessments/history', [AssessmentController::class, 'history'])
        ->name('assessments.history');

    Route::get('/assessments/history/{userAssessment}', [AssessmentController::class, 'result'])
        ->name('assessments.result');

    /*
    | Kode lama SCS-SF diarahkan ke SCS. Daftarkan di atas wildcard
    | /assessments/{code}, kalau tidak akan dianggap sebagai kode.
    */
    Route::get('/assessments/SCS-SF', fn () =>
        redirect()->route('assessments.introduction', 'SCS'));

    Route::get('/assessments/{code}', [AssessmentController::class, 'introduction'])
    ->name('assessments.introduction');
        Route::get('/assessments/{code}/start', [AssessmentController::class, 'start'])
    ->name('assessments.start');
        Route::post('/assessments/{code}', [AssessmentController::class, 'submit'])
    ->name('assessments.submit');

       Route::get('/learning', [UserContentController::class, 'index'])
        ->name('learning.index');

    Route::get('/learning/{content:slug}', [UserContentController::class, 'show'])
        ->name('learning.show');

    Route::post(
    '/admin/contents/upload-image',
    [ContentController::class, 'uploadImage']
    )->name('admin.contents.upload-image');


    Route::prefix('letters')->name('letter.')->group(function () {

        Route::get('/', [DearLittleMeController::class, 'index'])->name('index');
        Route::get('/create', [DearLittleMeController::class, 'create'])->name('create');
        Route::post('/', [DearLittleMeController::class, 'store'])->name('store');
        Route::get('/{letter}', [DearLittleMeController::class, 'show'])->name('show');
        Route::delete('/{letter}', [DearLittleMeController::class, 'destroy'])->name('destroy');

    });

    /*
    |--------------------------------------------------------------------------
    | Assessment
    |--------------------------------------------------------------------------
    */

    
});

/*
|--------------------------------------------------------------------------
| Profile
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});

require __DIR__.'/auth.php';