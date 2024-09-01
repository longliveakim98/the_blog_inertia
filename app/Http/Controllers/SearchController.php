<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function __invoke(Request $request)
    {
        // Retrieve and trim the search query
        $search = trim($request->input('search'));

        if ($search === '') {
            // If the search query is empty, return an empty collection
            $posts = collect(); // Alternatively, you can use new Collection()
        } else {
            // Perform the search query
            $posts = Post::with(['user', 'tags', 'contentBlocks'])
                ->where('title', 'LIKE', '%' . $search . '%')
                ->get();

            // Process the posts to handle image URLs
            foreach ($posts as $relatedPost) {
                foreach ($relatedPost->contentBlocks as $block) {
                    if ($block->type === 'image' && !filter_var($block->content, FILTER_VALIDATE_URL)) {
                        $block->content = asset('storage/' . $block->content);
                    }
                }
            }
        }

        // Return the Inertia response with the posts and search query
        return inertia('Search', [
            'posts' => $posts,
            'search' => $search,
        ]);
    }
}
