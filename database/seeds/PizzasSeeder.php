<?php

use App\Pizza;
use Illuminate\Database\Seeder;

class PizzasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        //fill 10 pizzas
        // cost = $
        //weight = kg
        $pizzas = [
            ["title" => "Margarita", "description" => "Content of pizza Margarita", "images"=>"[]", "cost"=>8, "weight"=>0.3],
            ["title" => "Arriva", "description" => "Content of pizza Arriva", "images"=>"[]", "cost"=>4.2, "weight"=>0.45],
            ["title" => "4 cheese", "description" => "Content of pizza 4 cheese", "images"=>"[]", "cost"=>9.5, "weight"=>0.37],
            ["title" => "Crazy pepperoni", "description" => "Content of pizza Crazy pepperoni", "images"=>"[]", "cost"=>12, "weight"=>0.83],
            ["title" => "Asian Shrimp", "description" => "Content of pizza Asian Shrimp", "images"=>"[]", "cost"=>10.9, "weight"=>0.78],
            ["title" => "Mexican", "description" => "Content of pizza Mexican", "images"=>"[]", "cost"=>7.5, "weight"=>0.45],
            ["title" => "Hawaii", "description" => "Content of pizza Hawaii", "images"=>"[]", "cost"=>13.95, "weight"=>0.56],
            ["title" => "Meaty", "description" => "Content of pizza Meaty", "images"=>"[]", "cost"=>6.15, "weight"=>0.76],
            ["title" => "Vegetarian", "description" => "Content of pizza Vegetarian", "images"=>"[]", "cost"=>7.5, "weight"=>0.44],
            ["title" => "Munchen", "description" => "Content of pizza Munchen", "images"=>"[]", "cost"=>9.25, "weight"=>0.9],
        ];

        foreach($pizzas as $pizza)
        {
            Pizza::create([
                'title' => $pizza['title'],
                'description' => $pizza['description'],
                'images' => $pizza['images'],
                'cost' => $pizza['cost'],
                'weight' => $pizza['weight'],
            ]);
        }

    }
}
