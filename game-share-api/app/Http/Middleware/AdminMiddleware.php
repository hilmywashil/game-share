<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->user() && auth()->user()->isAdmin()) {
            return $next($request);
        }

        return response()->json([
            'success' => false,
            'message' => 'Akses ditolak! Hanya admin yang dapat melakukan tindakan ini.'
        ], 403);
    }
}
