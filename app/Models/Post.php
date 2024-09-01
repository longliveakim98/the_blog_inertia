<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Post extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function contentBlocks()
    {
        return $this->hasMany(Content_Block::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function tag(string $name){
        $tag=Tag::firstOrCreate(['name'=>$name]);
        $this->tags()->attach($tag);
    }

    public function tags(){
        return $this->belongsToMany(Tag::class);
    }

    public function detachTags(array $tagNames)
    {
        $tags = Tag::whereIn('name', $tagNames)->get();
        $this->tags()->detach($tags);
    }

    public function detachAllTags()
    {
        $this->tags()->detach();
    }
}
