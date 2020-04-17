<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Cart;

class CartController extends Controller
{
    //
	public function add(Request $request)
	{
        return Cart::create($request->all());
	}

	public function remove($customer_id, $id)
	{
        Cart::removeFromCart($customer_id, $id);
        return response('', 204);
	}
/*
	public function edit(Request $request)// position_id
	{
	    $position = Cart::findOrFail($id);
        $position->update($request->all);
        return response('', 200);
	}*/

	public function show($customer_id)
	{
        return Cart::show($customer_id);
	}

	public function clear($customer_id)
	{
		//delete all rows where customer id = {customer_id}
       Cart::where('customer_id', $customer_id)->delete();
       return response('', 204);
	}

}
