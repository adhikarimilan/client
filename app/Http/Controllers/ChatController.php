<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\ChatEvent;
use App\user;
use Auth;

class ChatController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }

    public function send(Request $r){
        $message=$r->message;
        $user=User::findOrFail(Auth::user()->id);
        event(new ChatEvent($message,$user));
    }
}
