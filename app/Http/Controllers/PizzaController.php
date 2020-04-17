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

	public function index()
	{
	    return Pizza::all();
	}

	public function show($id)
    {
        return Pizza::find($id);
    }


}
