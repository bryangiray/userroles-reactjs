<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserlevelController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserroleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/user/add', [UserController::class, 'addUser']);
Route::post('/user/delete', [UserController::class, 'delete']);
Route::post('/user/edit', [UserController::class, 'edit']);

Route::delete('/user/role/delete/{id}', [UserroleController::class, 'delete']);
Route::post('/user/role/add', [UserroleController::class, 'addRole']);

Route::get('/user/{id}', [UserController::class, 'getUserById']);
Route::get('/user/{id}/roles/',[UserroleController::class, 'getRolesByUserId']);
Route::get('/userlevels/get', [UserlevelController::class, 'getUserlevels']);
