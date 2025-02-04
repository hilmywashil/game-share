<?php

namespace App\Http\Controllers\Api;

use App\Models\Publisher;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PublisherController extends Controller
{
    public function index()
    {
        $publishers = Publisher::with('games')->paginate();

        return response()->json([
            'success' => true,
            'data' => $publishers
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);
        $publisher = Publisher::create([
            'name' => $request->name,
        ]);
        return response()->json([
            'success' => true,
            'message' => 'Publisher berhasil ditambahkan',
            'data' => $publisher
        ], 201);
    }

    public function show($id)
    {
        $publisher = Publisher::with('games')->find($id);

        if (!$publisher) {
            return response()->json([
                'success' => false,
                'message' => 'Publisher not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $publisher
        ]);
    }

    public function update(Request $request, $id)
    {
        $publisher = Publisher::find($id);

        if (!$publisher) {
            return response()->json([
                'success' => false,
                'message' => 'Publisher not found'
            ], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $publisher->update([
            'name' => $request->name,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Publisher berhasil diperbarui',
            'data' => $publisher
        ]);
    }

    public function destroy($id)
    {
        $publisher = Publisher::find($id);

        if (!$publisher) {
            return response()->json([
                'success' => false,
                'message' => 'Publisher not found'
            ], 404);
        }

        $publisher->delete();

        return response()->json([
            'success' => true,
            'message' => 'Publisher berhasil dihapus'
        ]);
    }
}
