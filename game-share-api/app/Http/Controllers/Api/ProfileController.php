<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\User;

class ProfileController extends Controller
{
    public function updatePhoto(Request $request)
    {
        $request->validate([
            'profile_photo' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $user = Auth::user();

        if ($user->profile_photo) {
            Storage::delete('storage/' . $user->profile_photo);
        }

        $imagePath = $request->file('profile_photo')->store('profile_photos', 'public');

        $user->profile_photo = $imagePath;
        $user->save();

        return response()->json([
            'message' => 'Profile photo updated successfully',
            'profile_photo' => asset('storage/' . $imagePath),
        ]);
    }
}
