<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pizza;

class PizzaController extends Controller
{
    //
	public function add(Request $request)
	{
		//not necessary
	}
	
	public function show(Request $request = null)
	{
		//if(!$request) return Pizza::all()
		//else return Pizza::where('cost', '>', 5) 
	}
	
}
