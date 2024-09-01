<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;


class ProfileController extends Controller
{

    public function updateName(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        /** @var \App\Models\User $user **/
        $user = Auth::user();
        $user->name = $request->input('name');
        $user->save();

        return back()->with('success', 'Name updated successfully.');
    }

    public function updateEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email,' . Auth::id(),
        ]);

        /** @var \App\Models\User $user **/
        $user = Auth::user();
        $user->email = $request->input('email');
        $user->save();

        return back()->with('success', 'Email updated successfully.');
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'oldPassword' => 'required',
            'newPassword' => ['required', 'confirmed', Password::min(8)],
        ]);



        $user = Auth::user();

        if (!Hash::check($request->input('oldPassword'), $user->password)) {
            return back()->withErrors(['oldPassword' => 'Your current password does not match.']);
        }

        /** @var \App\Models\User $user **/
        $user->password = Hash::make($request->input('newPassword'));
        $user->save();

        return back()->with('success', 'Password updated successfully.');
    }

    public function updatePicture(Request $request)
    {
        $request->validate([
            'picture' => 'required|image|mimes:jpg,png,jpeg,gif|max:2048',
        ]);

        $user = Auth::user();

        if ($request->hasFile('picture')) {
            $file = $request->file('picture');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $filePath = $file->storeAs('profile_pictures', $filename, 'public');

            if ($user->picture && Storage::disk('public')->exists($user->picture)) {
                Storage::disk('public')->delete($user->picture);
            }
            /** @var \App\Models\User $user **/
            $user->picture = $filePath;
            $user->save();
        }

        return back()->with('success', 'Profile picture updated successfully.');
    }

    public function updateBio(Request $request)
    {
        $request->validate([
            'bio' => 'nullable|string|max:510',
        ]);

        /** @var \App\Models\User $user **/
        $user = Auth::user();
        $user->bio = $request->input('bio');
        $user->save();

        return back()->with('success', 'Bio updated successfully.');
    }
}

