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

        foreach ($stocks as $stock) {
            $count = Arr::random([1, 2, 4, 12]);

         // Calculate the payment interval (in months) based on the count
        $paymentInterval = 12 / $count;

        for ($i = 0; $i < $count; $i++) {
            // Calculate the payment date
            $paymentDate = Carbon::now()->addMonths($i * $paymentInterval);

            // Create a new dividend with the calculated date
            $dividend = Dividend::factory()->make([
                'paymentDates' => $paymentDate,
            ]);

            // Associate it with the stock
            $stock->dividends()->save($dividend);
        }

        }
    }
}
