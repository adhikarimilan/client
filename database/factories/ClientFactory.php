<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Client;
use Faker\Generator as Faker;

$factory->define(Client::class, function (Faker $faker) {
    return [
        'email'=>$faker->safeEmail,
        'name'=>$faker->name,
        'city'=>$faker->city
    ];
});
