{{-- <!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link rel="stylesheet" href="{{asset('css/app.css')}}">
    <meta name="csrf-token" content="{{csrf_token()}}">
    </head>
    <body> --}}
@extends('layouts.app')
@section('content')

        
            <div class="container-fluid">
                <h2 class="text-center">See All the Clients</h2>
            
                    <clients></clients>
                
            </div>
            
       <input type="text" v-model="name"  @keyup.enter="send">
        @endsection
     {{-- <script src="{{asset('js/app.js')}}"></script>
    </body>
</html> --}}
