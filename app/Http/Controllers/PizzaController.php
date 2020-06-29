<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pizza;

class PizzaController extends Controller
{
	public function index()
	{
	    $pizzas = Pizza::all();

	    return  $pizzas->map(function($pizza){
           # $pizza['images'] = mb_convert_encoding($pizza['images'], 'UTF-8', 'UTF-8');
            $pizza['images'] = base64_encode($pizza['images']);
            return $pizza;
        });


	}
}
