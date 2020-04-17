<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @method static where(string $string, string $string1, int $min)
 */
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
}
