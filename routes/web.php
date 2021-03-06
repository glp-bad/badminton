<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    // return view('welcome');
    return view('welcomevue');
});


Auth::routes();
Route::post('app/login',  'Auth\LoginController@loginProcess')->middleware("throttle:5,2");
Route::post('app/logout',  'Auth\LoginController@logout')->middleware('auth');
Route::post('app/printTestLaravel',  'Test\PrintController@printLaravel')->middleware('auth');

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');


