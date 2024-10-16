<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;


class Stock extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'company',
        'price',
        'quantity',
        'currency',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function dividends()
    {
        return $this->hasMany(Dividend::class);
    }
}
