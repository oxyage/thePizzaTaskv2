<?php

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/

Route::get('/pizzas', "PizzaController@index");
Route::get('/pizza/{id}', "PizzaController@show");


Route::get('/cart', function(){
    return new Response('Invalid `customer_id`', 403);
});


Route::post('/cart', "CartController@add");
Route::delete('/cart/{customer_id}/id/{id}', "CartController@remove");

Route::get('/cart/{customer_id}', "CartController@show");
Route::delete('/cart/{customer_id}', "CartController@clear");
/*Route::put('/cart', "CartController@edit");*/




#Route::post('/cart', "CartController@add");


