<?php

namespace App\Http\Controllers\Api;

use App\Models\Game;
use App\Http\Controllers\Controller;
use Dotenv\Exception\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Exception;

class GameController extends Controller
{
    public function index()
    {
        try {
            $games = Game::with(['publisher', 'genre', 'console'])->paginate();
            return response()->json([
                'success' => true,
                'message' => 'All Game List',
                'data' => $games
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'size' => 'nullable|string',
                'publisher_id' => 'required|exists:publishers,id',
                'genre_id' => 'required|exists:genres,id',
                'console_id' => 'required|exists:consoles,id',
                'link_download' => 'nullable|string',
                'downloads' => 'nullable|integer',
            ]);

            if (!$request->hasFile('image')) {
                return response()->json([
                    'success' => false,
                    'message' => 'File gambar tidak ditemukan'
                ], 400);
            }

            $imagePath = $request->file('image')->store('games', 'public');
            // dd($request->all());

            $game = Game::create([
                'image' => $imagePath,
                'name' => $request->name,
                'description' => $request->description,
                'size' => $request->size,
                'publisher_id' => $request->publisher_id,
                'genre_id' => $request->genre_id,
                'console_id' => $request->console_id,
                'link_download' => $request->link_download,
                'downloads' => $request->downloads,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Game berhasil ditambahkan',
                'data' => $game
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $e->getMessage()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function show($id)
    {
        $game = Game::with(['publisher', 'genre', 'console'])->find($id);

        if (!$game) {
            return response()->json([
                'success' => false,
                'message' => 'Game not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $game
        ]);
    }

    public function update(Request $request, $id)
    {
        $game = Game::find($id);

        if (!$game) {
            return response()->json([
                'success' => false,
                'message' => 'Game not found'
            ], 404);
        }

        try {

            $validator = Validator::make($request->all(), [
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'size' => 'nullable|string',
                'publisher_id' => 'required|exists:publishers,id',
                'genre_id' => 'required|exists:genres,id',
                'console_id' => 'required|exists:consoles,id',
                'link_download' => 'nullable|string',
                'downloads' => 'nullable|integer',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imagePath = $image->storeAs('public/games', $image->hashName());  // Menyimpan dengan nama hash

                Storage::delete('public/games/' . basename($game->image));

                $game->update(['image' => $imagePath]);  // Update nama gambar
            }

            $game->update($request->except('image'));

            return response()->json([
                'success' => true,
                'message' => 'Game berhasil diperbarui',
                'data' => $game
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation Failed',
                'error' => $e->getMessage(),
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error',
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function incrementDownloads($id)
    {
        $game = Game::findOrFail($id);
        $game->downloads += 1;
        $game->save();

        return response()->json(['message' => 'Downloads updated successfully', 'downloads' => $game->downloads]);
    }


    public function destroy($id)
    {
        $game = Game::find($id);

        if (!$game) {
            return response()->json([
                'success' => false,
                'message' => 'Game not found'
            ], 404);
        }

        Storage::delete('public/games/' . basename($game->image));
        $game->delete();

        return response()->json([
            'success' => true,
            'message' => 'Game berhasil dihapus'
        ]);
    }
}
