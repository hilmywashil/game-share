<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Game extends Model
{
    use HasFactory;
    
    /**
     * fillable
     *
     * @var array
     */
    protected $fillable = [
        'image',
        'name',
        'description',
        'size',
        'release_daate',
        'publisher_id',
        'genre_id',
        'console_id',
        'link_download',
        'downloads',
    ];
    public function publisher(): BelongsTo
    {
        return $this->belongsTo(Publisher::class, 'publisher_id');
    }
    public function genre(): BelongsTo
    {
        return $this->belongsTo(Genre::class, 'genre_id');
    }
    public function console(): BelongsTo
    {
        return $this->belongsTo(Console::class, 'console_id');
    }
}