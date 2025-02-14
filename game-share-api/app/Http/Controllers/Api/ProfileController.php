<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\User;

class ProfileController extends Controller
{
    // Update foto profil
    public function updateProfilePhoto(Request $request)
    {
        $request->validate([
            'profile_photo' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $user = Auth::user();

        // Hapus foto lama jika ada
        if ($user->profile_photo) {
            Storage::delete('public/' . $user->profile_photo);
        }

        // Simpan foto baru
        $profileImagePath = $request->file('profile_photo')->store('profile_photos', 'public');
        $user->profile_photo = $profileImagePath;
        $user->save();

        return response()->json([
            'message' => 'Foto profil berhasil diperbarui!',
            'profile_photo' => asset('storage/' . $user->profile_photo),
        ]);
    }

    // Update foto cover
    public function updateCoverPhoto(Request $request)
    {
        $request->validate([
            'cover_photo' => 'required|image|mimes:jpg,jpeg,png|max:4096',
        ]);

        $user = Auth::user();

        // Hapus cover lama jika ada
        if ($user->cover_photo) {
            Storage::delete('public/' . $user->cover_photo);
        }

        // Simpan cover baru
        $coverImagePath = $request->file('cover_photo')->store('cover_photos', 'public');
        $user->cover_photo = $coverImagePath;
        $user->save();

        return response()->json([
            'message' => 'Foto cover berhasil diperbarui!',
            'cover_photo' => asset('storage/' . $user->cover_photo),
        ]);
    }

    // Update profil (Nama & Foto)
    public function updateProfile(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'profile_photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'cover_photo' => 'nullable|image|mimes:jpg,jpeg,png|max:4096',
        ]);

        $user = Auth::user();

        // Simpan foto profil jika ada
        if ($request->hasFile('profile_photo')) {
            if ($user->profile_photo) {
                Storage::delete('public/' . $user->profile_photo);
            }
            $user->profile_photo = $request->file('profile_photo')->store('profile_photos', 'public');
        }

        // Simpan cover photo jika ada
        if ($request->hasFile('cover_photo')) {
            if ($user->cover_photo) {
                Storage::delete('public/' . $user->cover_photo);
            }
            $user->cover_photo = $request->file('cover_photo')->store('cover_photos', 'public');
        }

        // Simpan nama user
        $user->name = $request->name;
        $user->save();

        return response()->json([
            'message' => 'Profil berhasil diperbarui!',
            'user' => $user
        ]);
    }

    // Hapus foto profil
    public function deleteProfilePhoto()
    {
        $user = Auth::user();

        if ($user->profile_photo) {
            Storage::delete('public/' . $user->profile_photo);
            $user->profile_photo = null;
            $user->save();
        }

        return response()->json([
            'message' => 'Foto profil berhasil dihapus!',
            'profile_photo' => null
        ]);
    }

    // Hapus foto cover
    public function deleteCoverPhoto()
    {
        $user = Auth::user();

        if ($user->cover_photo) {
            Storage::delete('public/' . $user->cover_photo);
            $user->cover_photo = null;
            $user->save();
        }

        return response()->json([
            'message' => 'Foto cover berhasil dihapus!',
            'cover_photo' => null
        ]);
    }
}
