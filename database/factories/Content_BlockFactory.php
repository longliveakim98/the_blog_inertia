<?php

namespace Database\Factories;

use App\Models\Content_Block;
use Illuminate\Database\Eloquent\Factories\Factory;
use PhpParser\Node\Stmt\Block;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Content_Block>
 */
class Content_BlockFactory extends Factory
{

    protected $model = Content_Block::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['paragraph', 'image', 'header'];
    $type = $this->faker->randomElement($types);

    return [
        'type' => $type,
        'content' => $type === 'image'
            ? "https://picsum.photos/400/300?random=" . $this->faker->numberBetween(1, 300)
            : $this->faker->paragraph(),
        'order' => $this->faker->numberBetween(1, 10),
    ];
    }


}
