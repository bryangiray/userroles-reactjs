<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CoreController extends Controller
{
    public function getRolesByUser($user)
    {
        $userRoles = $user->userRoles; 
        $roles = [];
        
        foreach ($userRoles as $userRole) { // all role information
            $roles[] = [
                'id' => $userRole->id,
                'userId' => $userRole->user_id,
                'userlevelId' => $userRole->userlevel_id,
                'userlevelTitle' => !$userRole->userLevel ? $userRole->userlevel_id.' unknown' : $userRole->userLevel->userlevel_title, 
            ];
        }
    
        return $roles;
    }
}
