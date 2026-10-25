<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DearLittleMe extends Model
{
    use HasFactory;

    protected $table = 'dear_little_me';

    protected $fillable = [
        'user_id',
        'title',
        'letter',
        'is_favorite',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
}