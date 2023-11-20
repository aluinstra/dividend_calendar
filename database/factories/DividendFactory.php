<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Dividend;
use App\Models\Stock;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Dividend>
 */
class DividendFactory extends Factory
{

    protected $model = Dividend::class;


    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'stock_id' => Stock::pluck('id')->random(),
            'dividendYield' => $this->faker->randomFloat(4, 0.01, 30),
            'declarationDates' => $this->faker->date(),
        ];
    }
}
