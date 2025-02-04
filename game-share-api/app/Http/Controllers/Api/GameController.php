<?php

namespace App\Http\Controllers\Api;

use App\Models\Game;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class GameController extends Controller
{
    public function index()
    {
        $games = Game::with(['publisher', 'genre', 'console'])->paginate();
        return response()->json([
            'success' => true,
            'data' => $games
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'size' => 'nullable|string',
            'release_date' => 'nullable|date',
            'publisher_id' => 'required|exists:publishers,id',
            'genre_id' => 'required|exists:genres,id',
            'console_id' => 'required|exists:consoles,id',
            'link_download' => 'nullable|string',
            'downloads' => 'nullable|integer',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('games', 'public');

            $game = Game::create([
                'image' => $path,
                'name' => $request->name,
                'description' => $request->description,
                'size' => $request->size,
                'release_date' => $request->release_date,
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
        } else {
            return response()->json([
                'success' => false,
                'message' => 'File gambar tidak ditemukan'
            ], 400);
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

        $validator = Validator::make($request->all(), [
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'size' => 'nullable|string',
            'release_date' => 'nullable|date',
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
            $image->storeAs('public/games', $image->hashName());
            Storage::delete('public/games/' . basename($game->image));
            $game->update(['image' => $image->hashName()]);
        }

        $game->update($request->except('image'));

        return response()->json([
            'success' => true,
            'message' => 'Game berhasil diperbarui',
            'data' => $game
        ]);
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
