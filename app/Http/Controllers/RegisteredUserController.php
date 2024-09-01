<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class RegisteredUserController extends Controller
{
    public function create(){
        return inertia('auth/Register');
    }

    public function store(Request $request){
        $form = $request->validate([
            'name'=>['required'],
            'email'=>['required', 'email','unique:users,email'],
            'password'=>['required', 'confirmed',Password::min(6)],
            'picture' => ['required', 'image', 'mimes:jpeg,png,jpg,webp'],

        ]);

        $picturePath = $request->file('picture')->store('profile_pictures', 'public');

        $user = User::create([
            'name' => $form['name'],
            'email' => $form['email'],
            'password' => bcrypt($form['password']),
            'picture' => $picturePath,
        ]);
        Auth::login($user);
        return redirect('/');
    }
}
