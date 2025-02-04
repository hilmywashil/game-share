<?php

namespace App\Http\Controllers\Api;

use App\Models\Console;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ConsoleController extends Controller
{
    public function index()
    {
        $consoles = Console::with('games')->paginate();

        return response()->json([
            'success' => true,
            'data' => $consoles
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);
        $console = Console::create([
            'name' => $request->name,
        ]);
        return response()->json([
            'success' => true,
            'message' => 'Console berhasil ditambahkan',
            'data' => $console
        ], 201);
    }

    public function show($id)
    {
        $console = Console::with('games')->find($id);

        if (!$console) {
            return response()->json([
                'success' => false,
                'message' => 'Data Console not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $console
        ]);
    }

    public function update(Request $request, $id)
    {
        $console = Console::find($id);

        if (!$console) {
            return response()->json([
                'success' => false,
                'message' => 'Console not found'
            ], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $console->update([
            'name' => $request->name,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Console berhasil diperbarui',
            'data' => $console
        ]);
    }
    public function destroy($id)
    {
        $console = Console::find($id);

        if (!$console) {
            return response()->json([
                'success' => false,
                'message' => 'Console not found'
            ], 404);
        }

        $console->delete();

        return response()->json([
            'success' => true,
            'message' => 'Console berhasil dihapus'
        ]);
    }

}
