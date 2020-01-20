<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \Illuminate\Support\Facades\DB::table('users')->truncate();

        $user = new \App\User();
        $user->name = 'Admin';
        $user->email = 'admin@example.com';
        $user->password = bcrypt('123456');
        $user->save();
    }
}
