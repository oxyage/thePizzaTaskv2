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
            ["title" => "Margarita", "description" => "Pepperoni, mozzarella, marinara sauce, fresh basil", "images"=>\file_get_contents(database_path ("seeds/images/1.jpg")), "cost"=>8, "weight"=>0.3],
            ["title" => "Arriva", "description" => "Fresh spinach, feta, ricotta, mozzarella, fresh parsley, red onions", "images"=>\file_get_contents(database_path ("seeds/images/2.jpg")), "cost"=>4.2, "weight"=>0.45],
            ["title" => "4 cheese", "description" => "Mozzarella, marinara sauce, fresh basil", "images"=>\file_get_contents(database_path ("seeds/images/3.jpg")), "cost"=>9.5, "weight"=>0.37],
            ["title" => "Crazy pepperoni", "description" => "Double pepperoni, mozzarella, marinara sauce, fresh basil", "images"=>\file_get_contents(database_path ("seeds/images/4.jpg")), "cost"=>12, "weight"=>0.83],
            ["title" => "Asian Shrimp", "description" => "Grilled chicken, cherry tomatoes, ricotta, fresh parsley, mozzarella, bacon, red onions", "images"=>\file_get_contents(database_path ("seeds/images/5.jpg")), "cost"=>10.9, "weight"=>0.78],
            ["title" => "Mexican", "description" => "Grilled chicken, bbq sauce, bacon, mozzarella, fresh basil, red onions", "images"=>\file_get_contents(database_path ("seeds/images/6.jpg")), "cost"=>7.5, "weight"=>0.45],
            ["title" => "Hawaii", "description" => "Ham, fresh pineapple, mozzarella, marinara sauce, fresh basil", "images"=>\file_get_contents(database_path ("seeds/images/7.jpg")), "cost"=>13.95, "weight"=>0.56],
            ["title" => "Meaty", "description" => "Pepperoni, ham, italian sausage, mozzarella, bacon, marinara sauce, fresh basil", "images"=>\file_get_contents(database_path ("seeds/images/8.jpg")), "cost"=>6.15, "weight"=>0.76],
            ["title" => "Vegetarian", "description" => "Red onions, mushrooms, black olives, marinara sauce, fresh basil, vegan mozzarella , cherry tomatoes, pepper green, bell.", "images"=>\file_get_contents(database_path ("seeds/images/9.jpg")), "cost"=>7.5, "weight"=>0.44],
            ["title" => "Munchen", "description" => "Pepperoni, fresh basil, mozzarella, italian sausage, bacon, mushrooms, red onions, black olives, green peppers, marinara sauce", "images"=>\file_get_contents(database_path ("seeds/images/10.jpg")), "cost"=>9.25, "weight"=>0.9],
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
