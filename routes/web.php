<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserlevelController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserroleController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/csrf-token', function () {
    return Response::json(['csrfToken' => csrf_token()]);
});

Route::group(['middleware' => 'cors'], function () {
    Route::post('/user/add', [UserController::class, 'addUser']);
});


Route::get('/users', [UserController::class, 'getUsers']);
Route::get('/user/{id}', [UserController::class, 'getUserById']);
Route::get('/user/{id}/roles/',[UserroleController::class, 'getRolesByUserId']);
Route::get('/userlevels/get', [UserlevelController::class, 'getUserlevels']);
