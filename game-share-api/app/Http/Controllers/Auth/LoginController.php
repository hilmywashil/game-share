<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Exception;

class LoginController extends Controller
{
    public function __invoke(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return response([
                    'success' => false,
                    'message' => ['Tidak dapat menemukan akun anda.']
                ], 404);
            }

            if (!Hash::check($request->password, $user->password)) {
                return response([
                    'success' => false,
                    'message' => ['Password yang dimasukkan salah.']
                ], 401);
            }

            $token = $user->createToken('ApiToken')->plainTextToken;

            $response = [
                'success' => true,
                'user' => $user,
                'token' => $token
            ];

            return response($response, 201);
        } catch (Exception $e) {
            return response([
                'success' => false,
                'message' => ['Login Error, coba beberapa saat lagi.', $e->getMessage()]
            ], 500);
        }
    }
}
