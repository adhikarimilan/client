@extends('layouts.app')
@section('styles')
<style>
    body{
        display:flex;
        width:100vw;
        height: 100vh;
        justify-content: center;
        align-items: center;
    }
    .chat-bar{
        /* padding:25px; */
        border:1px solid saddlebrown;
        width:40vw;
    }
    #msg-box{
        /* display: block; */
    }
    .message-section{
        height: 50vh;
        overflow-Y: auto;
        overflow-X: hidden;
    }
    
    @media only screen and (max-width: 800px) {
  
  .chat-bar{
        /* padding:25px; */
        border:1px solid saddlebrown;
        width:95vw;
    }
}
    </style>
@endsection
@section('content')
<div class="chat-bar">
    <div class="top-section p-3 text-center bg-dark text-light">
    <h3>Chat App <span class="badge badge-pill badge-primary">@{{online}}</span> </h3>
    </div>
  <div class="message-section p-1"  v-chat-scroll="{always: false, smooth: true}">
      
        {{-- @{{value}} --}}
    {{-- <messsages>
    </messsages>   --}}
    {{-- <messages></messages> --}}
    <messages v-for="message,index in chat.messages" v-bind:key="message.index" :self=chat.self[index] 
    :user=chat.user[index]
    :time=chat.time[index]> 
        @{{message}}
    </messages>
  </div>
  <div style="height:28px;">&nbsp;
  <div class="badge badge-pill badge-primary" >@{{typing}}</div>
  </div>
  <input type="text" placeholder="write your message" id="msg-box" v-model="message" class="form-control"  @keyup.enter="send">
</div> 
@endsection
