<?php

use App\Http\Controllers\Api\ConsoleController;
use App\Http\Controllers\Api\GameController;
use App\Http\Controllers\Api\GenreController;
use App\Http\Controllers\Api\PublisherController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Upload Photo
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/user/update', [ProfileController::class, 'updateProfile']);
    Route::middleware('auth:sanctum')->post('/user/update-photo', [ProfileController::class, 'updateProfilePhoto']);
    Route::middleware('auth:sanctum')->post('/user/cover-photo', [ProfileController::class, 'updateCoverPhoto']);
    Route::post('/profile/delete-photo', [ProfileController::class, 'deleteProfilePhoto']);
    Route::post('/profile/delete-cover', [ProfileController::class, 'deleteCoverPhoto']);
});

//Auth
Route::post('register', RegisterController::class);
Route::post('login', LoginController::class);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::get('/users', [UserController::class, 'index']);

//Publisher
Route::get('publishers', [PublisherController::class, 'index']);
Route::get('publishers/{id}', [PublisherController::class, 'show']);
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('publishers', [PublisherController::class, 'store']);
    Route::put('publishers/{id}', [PublisherController::class, 'update']);
    Route::delete('publishers/{id}', [PublisherController::class, 'destroy']);
});

//Console
Route::get('consoles', [ConsoleController::class, 'index']);
Route::get('consoles/{id}', [ConsoleController::class, 'show']);
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('consoles', [ConsoleController::class, 'store']);
    Route::put('consoles/{id}', [ConsoleController::class, 'update']);
    Route::delete('consoles/{id}', [ConsoleController::class, 'destroy']);
});

//Genre
Route::get('genres', [GenreController::class, 'index']);
Route::get('genres/{id}', [GenreController::class, 'show']);
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('genres', [GenreController::class, 'store']);
    Route::delete('genres/{id}', [GenreController::class, 'destroy']);
});

//Game
Route::get('games', [GameController::class, 'index']);
Route::get('games/{id}', [GameController::class, 'show']);
Route::post('/games/{id}/increment-downloads', [GameController::class, 'incrementDownloads']);
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('games', [GameController::class, 'store']);
    Route::put('games/{id}', [GameController::class, 'update']);
    Route::delete('games/{id}', [GameController::class, 'destroy']);
});
