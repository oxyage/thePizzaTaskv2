<?php

use App\Cart;
use Illuminate\Database\Seeder;

class CartFillSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $carts = [
            ["customer_id" =>  1, "pizza_id" =>2, "count"=>4],
            ["customer_id" =>  1, "pizza_id" =>4, "count"=>3],
            ["customer_id" =>  1, "pizza_id" =>3, "count"=>2],
            ["customer_id" =>  1, "pizza_id" =>1, "count"=>1],

            ["customer_id" =>  2, "pizza_id" =>5, "count"=>4],
            ["customer_id" =>  2, "pizza_id" =>6, "count"=>3],
            ["customer_id" =>  2, "pizza_id" =>7, "count"=>2],

            ["customer_id" =>  3, "pizza_id" =>8, "count"=>1],
            ["customer_id" =>  3, "pizza_id" =>2, "count"=>4],

            ["customer_id" =>  4, "pizza_id" =>5, "count"=>6],

            ["customer_id" =>  9, "pizza_id" =>7, "count"=>3],

            ["customer_id" =>  12, "pizza_id" =>9, "count"=>11],

            ["customer_id" =>  147, "pizza_id" =>10, "count"=>22],

        ];

        foreach($carts as $cart)
        {
            Cart::create([
                'customer_id' => $cart['customer_id'],
                'pizza_id' => $cart['pizza_id'],
                'count' => $cart['count']
            ]);
        }
    }
}
