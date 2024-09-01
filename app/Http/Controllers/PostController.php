<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Content_Block;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{

    public function index()
    {
        $topPosts = Post::with(['contentBlocks','user','tags'])->latest()->take(4)->get();
        $posts = Post::with(['contentBlocks','user','tags'])->latest()->paginate(12);
        return inertia('Home', ["posts"=>$posts, "topPosts"=>$topPosts]);
    }


    public function create()
    {
        // return Inertia::render('Create');
        return ("CreatePage");
    }

    public function postCreate()
    {
        return Inertia::render('Create');

    }

    public function store(Request $request)
    {
        // Validate incoming data
        $data = $request->all();

        $validated = Validator::make($data, [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'blocks' => 'array',
            'blocks.*.type' => 'required|string|in:paragraph,image,header',
            'blocks.*.content' => 'nullable|string',
            'blocks.*.file' => 'nullable|file|mimes:jpeg,png,jpg,gif|max:2048',
            'tags'=>['nullable']
        ])->validate();

        $post = Post::create([
            'user_id' => $request->user()->id,
            'title' => $validated['title'],
            'description' => $validated['description'],
        ]);

        // Loop through each block of content
        foreach ($validated['blocks'] as $index => $block) {
            if ($block['type'] === 'image' && $request->hasFile("blocks.{$index}.file")) {
                // Handle image uploads
                $filePath = $request->file("blocks.{$index}.file")->store('uploads', 'public');
                $post->contentBlocks()->create([
                    'type' => 'image',
                    'content' => $filePath,
                    'order' => $index,
                ]);
            } else {
                // Handle text, headers
                $post->contentBlocks()->create([
                    'type' => $block['type'],
                    'content' => $block['content'],
                    'order' => $index,
                ]);
            }
        }

        if($validated['tags'] ?? false){
            foreach(explode(',', $validated['tags']) as $tag){
                $post->tag($tag);
            };
        }

        return redirect()->route('posts.show', $post->id)->with('success', 'Post created successfully.');
    }


    public function show($id)
    {
        $post = Post::with(['contentBlocks','user','tags'])->findOrFail($id);
        $posts = Post::with(['contentBlocks','user','tags'])->latest()->take(6)->get();
        $user = Auth::check() ? Auth::user()->id : null;

        foreach ($post->contentBlocks as $block) {
            if ($block->type === 'image') {
                // Check if the URL is already absolute
                if (!filter_var($block->content, FILTER_VALIDATE_URL)) {
                    $block->content = asset('storage/' . $block->content);
                }
            }
        }
        foreach ($posts as $relatedPost) {
            foreach ($relatedPost->contentBlocks as $block) {
                if ($block->type === 'image' && !filter_var($block->content, FILTER_VALIDATE_URL)) {
                    $block->content = asset('storage/' . $block->content);
                }
            }
        }

        return inertia('Show', [
            'post' => $post,
            'posts' => $posts,
            'user'=>$user,
        ]);
    }


    public function edit($id)
    {
        $post = Post::with(['contentBlocks'])->findOrFail($id);
        $tags = $post->tags;

        return inertia('Edit', ['post'=> $post, 'tags'=>$tags]);
    }


    public function update(Request $request, Post $post)
    {
        $data = $request->input('data');

        // Validate incoming data
        $validated = Validator::make($data, [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'blocks' => 'array',
            'blocks.*.type' => 'required|string|in:paragraph,image,header',
            'blocks.*.content' => 'nullable|string',
            'blocks.*.file' => 'nullable|file|mimes:jpeg,png,jpg,gif|max:2048',
            'tags'=>['nullable']
        ])->validate();

        $existingBlockIds = $post->contentBlocks->pluck('id')->toArray();
        $newBlockIds = [];

        // Handle blocks
        foreach ($validated['blocks'] as $index => $block) {
            $filePath = null;

            if ($block['type'] === 'image' ) {
                if($request->hasFile("data.blocks.{$index}.file")){
                    // Handle image upload
                    $file = $request->file("data.blocks.{$index}.file");
                    $filePath = $file->store('uploads', 'public');
                }
            }

            // Update or create a block record
            $contentBlock = Content_Block::updateOrCreate(
                ['id' => $block['id'] ?? null],
                [
                    'post_id' => $post->id,
                    'type' => $block['type'],
                    'content' => $filePath ?? $block['content'], // Use filePath if available
                    'order' => $index,
                ]
            );

            // Keep track of new block IDs
            $newBlockIds[] = $contentBlock->id;
        }

        // Delete blocks that are no longer in the updated content
        $blocksToDelete = array_diff($existingBlockIds, $newBlockIds);
        if ($blocksToDelete) {
            Content_Block::whereIn('id', $blocksToDelete)->delete();
        }

        $post->detachAllTags();
        if($validated['tags'] ?? false){
            foreach(explode(',', $validated['tags']) as $tag){
                $post->tag($tag);
            };
        }


        return redirect()->route('posts.show', $post->id)->with('success', 'Post updated successfully.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $contentBlocks = $post->contentBlocks;

        foreach ($contentBlocks as $block) {
            if ($block->type === 'image') {
                Storage::disk('public')->delete($block->content);
            }
        }

        $post->contentBlocks()->delete();

        $post->delete();
        return redirect('/')->with('message','The post have been deleted');
    }
}
