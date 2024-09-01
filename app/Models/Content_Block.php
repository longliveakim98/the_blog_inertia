<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;

class Content_Block extends Model
{
    use HasFactory;

    protected $fillable = ['post_id', 'type', 'content', 'order'];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    public function delete()
    {
        // If the block is an image, delete the file from storage
        if ($this->type === 'image') {
            Storage::disk('public')->delete($this->content);
        }

        // Call the parent delete method to delete the block from the database
        return parent::delete();
    }
}
