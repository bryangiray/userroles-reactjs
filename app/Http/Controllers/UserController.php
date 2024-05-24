<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;

class UserController extends CoreController
{
    public function getUsers()
    {
        $users = User::select('id','name','email')->get();
        
        foreach ($users as $key => $user) {
            $users[$key]->roles = $this->getRolesByUser($user);
            // echo "<pre>"; print_r($users[$key]); die;
        }

        return response()->json([
            'message' => 'success',
            'users' => $users,
        ], Response::HTTP_OK);
    }

    public function getUserById()
    {
        $userId = request('id');
        $user = User::select('id', 'name', 'email')->find($userId); //get user
        
        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], Response::HTTP_NOT_FOUND);
        }
        
        $user->roles = $this->getRolesByUser($user);

        return response()->json([
            'message' => 'Successfully pulled',
            'user' => $user
        ], Response::HTTP_OK);
    }

    public function addUser(Request $request)
    {
        
        $input = $request->all();
      
        // Validate if email is already existing
        $verifyEmail = User::where('email', $request->email)->first();

        if ($verifyEmail) { //if email is already existing
            return response()->json([
                'message' => 'Email already existing'
            ], Response::HTTP_CONFLICT);
        }

        $newUser = new User();
        $newUser->name = $request->name;
        $newUser->email = $request->email;
        $newUser->password = strtotime(date('Y-m-d H:i:s'));
        $newUser->save();

        return response()->json([
            'message' => 'Successfully Registered',
            'user' => $newUser,
        ], Response::HTTP_OK);
    }
}
