<?php

namespace App\Http\Controllers;

use App\Models\Tag;


class TagController extends Controller
{
    public function __invoke(Tag $tag){

        $posts = $tag->posts()->with(['contentBlocks', 'user', 'tags'])->get();

        return inertia('Search', ['posts'=>$posts, 'tag'=>$tag->name]);
    }
}
