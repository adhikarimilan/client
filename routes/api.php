<?php

use Illuminate\Http\Request;
use App\Client;

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

//  Route::middleware('auth:api')->get('/client/{id}', function ($id, Request $request) {
//     $data=Client::find($id);
//     if($data==NULL)
//     return (['success'=>'false']);
//     return $data;
//  });
Route::get('/clients',function(){
     $data=Client::orderBy('created_at','desc')->paginate(15);
     return $data;
});
Route::get('/client/{id}',function($id){
     $data=Client::find($id);
     if($data==NULL)
     return (['success'=>'false']);
     return $data;
 });
Route::patch('/client/{id}',function($id, Request $request){
    $client=Client::find($id);
    if($client==NULL)
    return (['success'=>'false']);
    $client->name=$request->name;
    $client->email=$request->email;
    $client->city=$request->city;
    $client->save();
    return (['success'=>'true']);
});
Route::post('/client',function(Request $request){
    $client=new Client;
    $client->name=$request->name;
    $client->email=$request->email;
    $client->city=$request->city;
    $client->save();
    return (['success'=>'true']);
});

Route::delete('/client/{id}',function($id){
    $client=Client::find($id);
    if($client==NULL)
    return (['error'=>'Client not found']);
    $client->delete();
    return (['success'=>'true']);
});


Route::post('clients', 'API\UserController@clients');
Route::post('login', 'API\UserController@login');
Route::post('register', 'API\UserController@register');
Route::group(['middleware' => 'auth:api'], function(){
Route::post('details', 'API\UserController@details');
});