<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class SessionsController extends Controller
{
    public function create(){
        return inertia('auth/Login');
    }

    public function store(Request $request){
        $form = $request->validate([

            'email'=>['required', 'email'],
            'password'=>['required']

        ]);
        if (! Auth::attempt($form)) {
            throw ValidationException::withMessages([
                'email' => 'Sorry, those credentials do not match.',
            ]);
        }
        request()->session()->regenerate();
        return redirect('/');
    }

    public function show($id){
        $profile = User::findOrFail($id);
        $profile->picture = asset($profile->picture);
        $user = Auth::check() ? Auth::user()->id : null;
        $posts = Post::with(['contentBlocks','user','tags'])
            ->where('user_id', $profile->id)
            ->latest()
            ->get();

            foreach ($posts as $relatedPost) {
                foreach ($relatedPost->contentBlocks as $block) {
                    if ($block->type === 'image' && !filter_var($block->content, FILTER_VALIDATE_URL)) {
                        $block->content = asset('storage/' . $block->content);
                    }
                }
            }
        return inertia('Profile', ['profile'=>$profile, 'posts'=>$posts, 'userId'=>$user]);
    }



    public function destroy(){
        Auth::logout();
        return redirect('/login');
    }
}
