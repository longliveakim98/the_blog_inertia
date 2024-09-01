<?php

namespace Database\Seeders;

use App\Models\Tag;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $tags = Tag::factory()->count(15)->create();

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'), // Hash the password
            'picture' => 'profile_pictures/PvvAYlnRxSlwEEZ85TllEWRG3pqhVAYiU4EHdgdm.png',
        ]);


        Post::factory(100)->create(['user_id' => $user->id])->each(function ($post) use ($tags) {

            $post->tags()->attach($tags->random(rand(2, 5))->pluck('id'));
        });
    }
}
