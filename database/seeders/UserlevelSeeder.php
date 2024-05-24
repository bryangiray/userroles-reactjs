<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Userlevel;

class UserlevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $userlevels = [
            ['userlevel_title' => 'Author'],
            ['userlevel_title' => 'Editor'],
            ['userlevel_title' => 'Subscriber'],
            ['userlevel_title' => 'Administrator']
            // Add more user levels as needed
        ];

        foreach ($userlevels as $userlevel) {
            Userlevel::create($userlevel);
        }
    }
}
