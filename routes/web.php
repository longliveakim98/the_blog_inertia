<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TagController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SessionsController;
use App\Http\Controllers\RegisteredUserController;

Route::middleware('auth')->group(function () {
    Route::get('posts/create', [PostController::class, 'postCreate'])->name('posts.create');
    Route::post('posts', [PostController::class, 'store'])->name('posts.store');
    Route::get('posts/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
    Route::put('posts/{post}', [PostController::class, 'update'])->name('posts.update');
    Route::delete('posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');
    Route::post('/logout', [SessionsController::class, 'destroy'])->name('logout');
});

Route::middleware(['auth'])->group(function () {
    Route::post('/profile/update-name', [ProfileController::class, 'updateName'])->name('profile.updateName');
    Route::post('/profile/update-email', [ProfileController::class, 'updateEmail'])->name('profile.updateEmail');
    Route::post('/profile/update-password', [ProfileController::class, 'updatePassword'])->name('profile.updatePassword');
    Route::post('/profile/update-picture', [ProfileController::class, 'updatePicture'])->name('profile.updatePicture');
    Route::post('/profile/update-bio', [ProfileController::class, 'updateBio'])->name('profile.updateBio');
});

Route::get('/', [PostController::class, 'index']);
Route::get('profile/{user}', [SessionsController::class, 'show'])->name('profile');
Route::get('posts/{post}', [PostController::class, 'show'])->name('posts.show');
Route::get('/search',SearchController::class);
Route::get('/tags/{tag:name}',TagController::class);

Route::middleware('guest')->group(function(){
    Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('register', [RegisteredUserController::class, 'store'])->name('register.store');
    Route::get('login', [SessionsController::class, 'create'])->name('login');
    Route::post('login', [SessionsController::class, 'store'])->name('login.store');
});
