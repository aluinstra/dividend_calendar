<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Dividend;
use App\Models\Stock;

use Illuminate\Support\Arr;
use Carbon\Carbon;

class DividendsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $stocks = Stock::all();

        // Specify the number of years you want to seed
        $numberOfYears = 2;

        foreach ($stocks as $stock) {
             // Use a fixed starting date for consistency
            $startDate = Carbon::parse('2024-01-06');

            // loop through each year
            for ($year = 0; $year < $numberOfYears; $year++) {

                // Calculate the payment interval (in months) based on the count
                $count = Arr::random([1, 2, 4, 12]);
                $paymentInterval = 12 / $count;

            for ($i = 0; $i < $count; $i++) {
                // Calculate the payment date based on the start date
                $paymentDate = $startDate->copy()->addMonths($i * $paymentInterval);

                // Create a new dividend with the calculated date
                $dividend = Dividend::factory()->make([
                    'paymentDates' => $paymentDate,
                ]);

                // Associate it with the stock
                $stock->dividends()->save($dividend);
            }
             // Move the start date to the next year
                $startDate->addYear();
            }
        }
    }
}
