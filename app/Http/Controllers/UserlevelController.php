<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Userlevel;

class UserlevelController extends Controller
{
    public function getUserlevels()
    {
        $userlevels = Userlevel::select('id', 'userlevel_title as userlevelTitle')->get();

        return response()->json([
            'message' => 'success',
            'userlevels' => $userlevels
        ], Response::HTTP_OK);
    }
}
