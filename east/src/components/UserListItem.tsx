import React, { useContext } from "react";
import { User, Userlevel } from "../contexts/ContextProvider";
import { TiDelete, TiEdit } from "react-icons/ti";
import { roleStateContext } from '../contexts/RoleProvider';
import api from "../api";
import { useUsers } from "../contexts/UsersProvider"
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

interface UserLisItemProps {
    user: User;
    deleteUser: (user: User) => void;
    editUser: (user: User) => void;
    newRole: (user: User) => void;
    isRoleState: boolean;
    setRoleOpen: (isRoleState : boolean) => void;
}

const UserListItem: React.FC<UserLisItemProps> = ({ user, deleteUser, editUser,newRole,isRoleState, setRoleOpen }) => {
    const { users, setUsers } = useUsers();
    const { currentRole } = roleStateContext();

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const fetchUsers = async () => {
       
        try {
            //get all users
            const response = await api.get('users');
            if (typeof response.data == 'object') {
                setUsers(response.data.users) // assign to users context
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handeDeleteRole = async(role : Userlevel) => {
        try {
    

            const delRol = await api.delete(`api/user/role/delete/${role.id}`, {
                responseType: 'json'
            });            
            await fetchUsers(); // Fetch updated user list
            Toast.fire({
                icon: "success",
                title: delRol.data.message
            });
        } catch (error) {
            console.log(error)
            if (error.response && error.response.status) {
                switch (error.response.status) {
                    case 500:
                        Swal.fire({
                            title: 'Error!',
                            text: error.message,
                            icon: 'error',
                            confirmButtonText: 'Ok'
                          })
                        break;
                    case 401:
                    case 409:
                        Swal.fire({
                            title: 'Error!',
                            text: error.response.data.message,
                            icon: 'error',
                            confirmButtonText: 'Ok'
                          })
                        break;
                }
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Error response or status is undefined.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                  })
                
            }
        }
    }
    return (
           
        <tr key={user.id}>
                <td className="py-4 px-6 border-b border-gray-200">{user.name}</td>
                <td className="py-4 px-6 border-b border-gray-200">{user.email}</td>
                <td className="py-4 px-6 border-b border-gray-200">
                    {
                        user.roles && user.roles.length > 0
                        ? user.roles.map((role,i)=> (
                            <span key={i} className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                                {role.userlevelTitle} 
                                <TiDelete onClick={() => handeDeleteRole(role)}className="inline-block ml-2" />
                            </span>
                         ))
                        : <div>
                            No Role yet
                           
                        </div>
                    }
                     <button onClick={() => newRole(user)} className="mt-2 bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Add Role</button>
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                    <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button 
                        type="button" 
                        className="hidden px-4 py-2 text-sm font-medium bg-gray-700 text-white rounded-lg"
                        onClick={() => editUser(user)}><TiEdit />
                    </button>
                    <button 
                        type="button" 
                        className="hidden px-4 py-2 text-sm font-medium bg-red-400 text-white rounded-lg"
                        onClick={() => deleteUser(user)}><TiDelete />
                    </button>
                      
                    </div>
                </td>
        </tr>
       
    )
}

export default UserListItem