<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class RegisterController extends Controller
{
    public function __invoke(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => ['required', 'string', 'max:50'],
                'email' => ['required', 'email', 'max:100', 'unique:users,email'],
                'password' => ['required', 'confirmed', Password::min(8)],
            ]);

            if ($validator->fails()) {
               throw new ValidationException($validator);
            }

            $input = $request->all();
            $input['password'] = Hash::make($input['password']);
            $user = User::create($input);

            $success['name'] = $user->name;
            $success['email'] = $user->email;
            $success['token'] = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Sukses register',
                'data' => $success
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Register gagal',
                'data' => $e->errors()
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Unexpected Error',
                'data' => $e->getMessage()
            ]);
        }
    }
}
