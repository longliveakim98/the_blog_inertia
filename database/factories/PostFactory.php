<?php

namespace Database\Factories;

use App\Models\Post;
use Database\Factories\ContentBlockFactory;
use App\Models\Content_Block;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    protected $model = Post::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Post $post) {
            Content_Block::factory()
                ->count($this->faker->numberBetween(1, 5)) // Number of blocks per post
                ->for($post)
                ->create();
        });
    }
}
