<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Stock;
use Illuminate\Support\Arr;

class StocksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all(); // Get all the users

        // Loop through each user
        foreach ($users as $user) {
            // Assign a random number of stocks (between 7 and 42) to the user
            $stockCount = rand(7, 42);

            // Create the stocks and assign them to the current user
            Stock::factory($stockCount)->create([
                'user_id' => $user->id,
            ]);
        }
    }
}
