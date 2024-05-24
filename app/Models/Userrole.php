<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Userrole extends Model
{
    use HasFactory;
    public function userLevel()
    {
        return $this->belongsTo(UserLevel::class, 'userlevel_id');
    }
}
