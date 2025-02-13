<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->string('image');
            $table->string('name');
            $table->string('description')->nullable();
            $table->integer('size');
            $table->foreignId('publisher_id')->references('id')->on('publishers')->onUpdate('cascade');
            $table->foreignId('genre_id')->references('id')->on('genres');
            $table->foreignId('console_id')->references('id')->on('consoles')->onUpdate('cascade');
            $table->string('link_download');
            $table->integer('downloads')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
