<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Exception;

class UserController extends Controller
{
    public function index()
    {
        try {
            $users = User::latest()->paginate();
            return response()->json([
                'success' => true,
                'message' => 'List User',
                'data' => $users
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed',
                'error' => $e->getMessage()
            ]);
        }
    }
}
