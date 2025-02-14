<?php

namespace App\Http\Controllers\Api;

use App\Models\Console;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;

class ConsoleController extends Controller
{
    public function index()
    {
        try {

            $consoles = Console::with('games')->paginate();

            return response()->json([
                'success' => true,
                'message' => 'List data Console',
                'data' => $consoles
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menampilkan data Console',
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
            $console = Console::create([
                'name' => $request->name,
            ]);
            return response()->json([
                'success' => true,
                'message' => 'Console berhasil ditambahkan',
                'data' => $console
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan data Console',
                'error' => $e->getMessage()
            ]);
        }
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
