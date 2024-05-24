<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;
use App\Models\Userrole;

class UserroleController extends CoreController
{
    public function getRolesByUserId()
    {
        $user = User::find(request('id'));

        if (!$user) {
            return response()->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $roles = $this->getRolesByUser($user);

        return response()->json([
            'message' => 'successfully pulled', 
            'user' => $user,
            'roles' => $roles,
        ], Response::HTTP_OK);

    }

    public function addRole(Request $request)
    {
        $user = User::find($request->userId);

        if (!$user) {
            return response()->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        //check if role is existing
        $role = Userrole::where('userlevel_id', $request->userlevelId)->where('user_id', $user->id)->first();

        if ($role) {
            return response()->json([
                'message' => 'User role is alrady existing'
            ], Response::HTTP_CONFLICT);
        }

        $newRole = new Userrole();
        $newRole->user_id = $user->id;
        $newRole->userlevel_id = $request->userlevelId;
        $newRole->save();
        
        $user = User::find($user->id); //query user again to get all roles;
        $roles = $this->getRolesByUser($user);

        return response()->json([
            'message' => 'Role added',
            'user' => $user,
            'roles' => $roles,
        ], Response::HTTP_OK);

    }

    public function delete(Request $request)
    {
        $roleId = $request->id;
        $role = Userrole::find($roleId);

        if (!$role) {
            return response()->json([
                'message' => 'Role Not found'
            ], Response::HTTP_CONFLICT);
        }

        $role->delete();
        return response()->json([
            'message' => 'Role Deleted',
        ], Response::HTTP_OK);
    }
}
