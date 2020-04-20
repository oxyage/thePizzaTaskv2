<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Customer;

class CustomerController extends Controller
{
    //
	public function add(Request $request)
	{
		return Customer::create($request->all());
	}

    protected function all()
    {
        return Customer::all();
    }


}
