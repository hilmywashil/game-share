<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Genre;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class GenreController extends Controller
{
    public function index()
    {
        try {
            $genres = Genre::with('games')->paginate();
            return response()->json([
                'success' => true,
                'message' => 'List data Genre',
                'data' => $genres
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menampilkan Genre',
                'error' => $e->getMessage()
            ]);
        }
    }
    public function store(Request $request)
    {
        try {

            $request->validate([
                'name' => 'required|string|max:255'
            ]);
            $genre = Genre::create([
                'name' => $request->name,
            ]);
            return response()->json([
                'success' => true,
                'message' => 'Genre berhasil ditambahkan',
                'data' => $genre
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan data genre',
                'error' => $e->getMessage()
            ]);
        }
    }
    public function show($id)
    {
        try {

            $genre = Genre::with('games')->find($id);

            if (!$genre) {
                return response()->json([
                    'success' => false,
                    'message' => 'Genre not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Detail data Genre',
                'data' => $genre
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menampilkan Detail data Genre',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function destroy($id)
    {
        try {
            $genre = Genre::find($id);

            if (!$genre) {
                return response()->json([
                    'success' => false,
                    'message' => 'Genre not found'
                ], 404);
            }

            $genre->delete();

            return response()->json([
                'success' => true,
                'message' => 'Genre berhasil dihapus'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus data Genre',
                'error' => $e->getMessage()
            ]);
        }
    }
}
