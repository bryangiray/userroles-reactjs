import React, {useEffect, useState, useRef} from 'react';
import api from '../api';
import { Userlevel } from '../contexts/ContextProvider';
import { useUsers } from "../contexts/UsersProvider"
import { roleStateContext } from '../contexts/RoleProvider';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

interface DefaultModalProps {
    isRoleState: boolean;
    setRoleOpen: (isRoleState : boolean) => void;
}


const ModalRoleForm: React.FC<DefaultModalProps> = ({ isRoleState, setRoleOpen }) => {
    const { currentRole, setCurrentRole} = roleStateContext();
    const { users, setUsers } = useUsers();

    const [roleId, setRoleId] = useState<number>(0);
    const [userName, setUserName] = useState<string>('');
    const [userRole, setRole] = useState<number>(0);
    const [userId, setUserId] = useState<number | null>(currentRole ? currentRole.userId : 0);
    const roleRef = useRef<HTMLInputElement>(null);

   

    const [userlevels, setUserlevels] = useState<Userlevel[]>([]); 
    const closeModal = () => {
        setRoleOpen(false)
    }

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try { 
            const formData = new FormData(e.currentTarget);
            const newRole = await api.post('api/user/role/add', formData);
            setRoleOpen(false)
            await fetchUsers(); // Fetch updated user list
            Toast.fire({
                icon: "success",
                title: newRole.data.message
            });
            
        } catch (error) {

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
                console.log("Error response or status is undefined.");
            }

            
            
            
        }
    };

    useEffect(() => {
        if (currentRole !== null)  {
            setUserId(currentRole.userId)
            setRoleId(currentRole.setRoleId)
            setRole(currentRole.userRole)
            setUserName(currentRole.userName)
        }
        console.log('updated', currentRole)
    },[currentRole])
    
    const fetchRoles = async() => {
        try {
            const roles =  await api.get('api/userlevels/get')
            if( roles.status == 200 ) {
                setUserlevels(roles.data.userlevels)
            }
        } catch (error) {

        }
    }
    useEffect(() => {
       fetchRoles();
    },[])

    const handleChangeRole = (e: ChangeEvent<HTMLInputElement>) => {
        setRoleId(e.target.value);
        const updatedRole = { ...currentRole };
        // Update the userlevelId property
        updatedRole.userlevelId = e.target.value; // Your new userlevelId value
        // Set the updated role using setCurrentRole
        setCurrentRole(updatedRole);
        setUserId(updatedRole.userId)
        setRole(updatedRole.userlevelId)
        setRoleId(updatedRole.id)
    }
    return (
        <>
            <div
            id="default-modal"
            tabIndex={-1}
            aria-hidden={!isRoleState}
            className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isRoleState ? '' : 'hidden'}`}
        >
            <div className="relative mx-auto p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t text-white dark:border-gray-600">
                       Role for : {userName}
                    </div>
                    { currentRole?.userlevelId } { currentRole?.userlevelTitle}
                    <div className="p-4 md:p-5 space-y-4">
                        <form onSubmit={handleSubmit} className="space-y-4" action="#">
                            <div>
                               <select ref={roleRef} name="userlevelId" onChange={handleChangeRole} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {
                                        userlevels.map((role) => (
                                            <option 
                                                key={role.id} 
                                                value={role.id}>
                                                {role.userlevelTitle}
                                            </option>
                                        ))
                                    }
                               </select>
                               <input type="hidden" 
                                    name="userId"
                                    value={userId} 
                                        />
                                <input type="hidden" 
                                    name="roleId"
                                    value={roleId} 
                                        />
                            </div>
                           
                            
                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">ADD</button>
                            
                        </form>
                    </div>
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        
                    <button onClick={() => closeModal(false)} data-modal-hide="default-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Close</button>
                    </div>
                </div>
            </div>
        </div>
        </>
        
    );
};

export default ModalRoleForm;