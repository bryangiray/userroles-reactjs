import React, {useState, useEffect, useContext, ReactNode} from "react"
import PageComponent from "../components/PageComponent"
import UserListItem from "../components/UserListItem"
import { User as UserInterface } from "../contexts/ContextProvider"
import { useUsers } from "../contexts/UsersProvider"
import api from "../api"
import ModalAddUser from "../components/ModalAddUser"
import ModalRoleForm from "../components/ModalRoleForm"
import { roleStateContext } from '../contexts/RoleProvider';

interface UserProps  {

}

const User: React.FC<UserProps> = () => { 
    const { users, setUsers } = useUsers();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRoleState, setRoleOpen] = useState(false);
    const { currentRole, setCurrentRole } = roleStateContext(); //user role context
    
    const handelNewRole = () => {
        setRoleOpen(true);
    }

    const handleAddNewUserClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false)
        setRoleOpen(false)
    }
    
    const [csrfToken, setCToken] = useState<string>("")

    const getFormToken = async () => {
        try {
            const res = await api.get('/csrf-token')
            
            if (typeof res.data == 'object'){
                setCToken(res.data.csrfToken)
                console.log(res.data.csrfToken)
            }

        } catch (error) {

        }
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

    useEffect(() => {
        getFormToken()
        fetchUsers();
    }, [setUsers]);

    const deleteUser = (user: UserInterface) => {
        console.log('delete user', user);
    };

    const newRole = (user: UserInterface) => {
        console.log('new role', user)
        setRoleOpen(true);

        const updatedRole = { ...currentRole };
        // Update the userId property
        updatedRole.userId = user.id; // Your new userId value
        updatedRole.userName = user.name; // Your new userId value
        // Set the updated role using setCurrentRole
        console.log(currentRole)
        setCurrentRole(updatedRole);

    }

    const editUser = (user: UserInterface) => {
        console.log('edit user', user);
    };

    const addUser = () => {

    }

    return (
        <div>
           <PageComponent title="Users">
                <button
                    data-modal-target="default-modal"
                    data-modal-toggle="default-modal"
                    className="mb-5 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    onClick={handleAddNewUserClick}
                >
                    Add User
                </button>
    
                <ModalAddUser isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} csrfToken={csrfToken}/>
                <ModalRoleForm isRoleState={isRoleState} setRoleOpen={setRoleOpen} />
        
            
           <table className="shadow-lg rounded-lg overflow-hidden">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="bg-gray-100">
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Full Name</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Email</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Roles</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase"></th>
                        </tr>
                </thead>
                <tbody>
                    { users.map((user, index) => (
                        <UserListItem 
                            user={user} 
                            key={index} 
                            deleteUser={deleteUser} 
                            editUser={editUser}
                            newRole={newRole}
                            isRoleState={isRoleState} 
                            setRoleOpen={setRoleOpen}
                            />
                    ))}
                </tbody>
            </table>
                
           </PageComponent>
        </div>
    )
}

export default User