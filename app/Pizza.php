<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pizza extends Model
{
    //
	protected $fillable = [
						'title',
						'description',
						'images',
						'cost',
						'weight'
						];


    public $timestamps = false;

	public function getPizzasByCost($min, $max)
	{

	}

}
