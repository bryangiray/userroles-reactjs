import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import api, {apiUrl} from '../api';
import axios from 'axios';
import { useUsers } from "../contexts/UsersProvider"
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

interface DefaultModalProps {
    isOpen: boolean;
    setIsModalOpen: (isOpen : boolean) => void;
    csrfToken: string;
}

interface FormData {
    name: string;
    email: string;
    id: number;
  }

const ModalAddUser: React.FC<DefaultModalProps> = ({ isOpen, setIsModalOpen, csrfToken }) => {
    const { users, setUsers } = useUsers();
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const [newName, setName] = useState<string>("");
    const [newEmail, setEmail] = useState<string>("");

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
        if (emailRef.current) {
            emailRef.current.focus();
            }
    },[emailRef])

    useEffect(() => {
        if (nameRef.current) {
            nameRef.current.focus();
            }
    },[nameRef])

    const [formData, setFormData] = useState<FormData>({
        name: '',
        id: 0,
        email: '',
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
       
        if( e.target.name == 'name') {
            console.log(e.target.name+' sd')
            setName(e.target.value)
        } else {
            console.log('lu')
            setEmail(e.target.value)
        }
        
    }
    
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            
            try { 
                const formData = new FormData(e.currentTarget);
                const newUser = await api.post('api/user/add', formData);
                
                switch (newUser.status)
                {
                    case 200:
                        await fetchUsers(); // Fetch updated user list
                        Toast.fire({
                            icon: "success",
                            title: newUser.data.message
                          });
                          
                          setIsModalOpen(false)
    
                        break;
                    case 409:
                        Swal.fire({
                            title: 'Error!',
                            text: newUser.data.message,
                            icon: 'error',
                            confirmButtonText: 'Ok'
                          })
      
                        break;
                    default:
                        alert(newUser.status)
                }

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
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error response or status is undefined.',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                      })
                }
                
            }
        };


    const closeModal = () => {
        setIsModalOpen(false)
    }
    return (
        <>
            <div
            id="default-modal"
            tabIndex={-1}
            aria-hidden={!isOpen}
            className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isOpen ? '' : 'hidden'}`}
        >
            <div className="relative mx-auto p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t text-white dark:border-gray-600">
                       Add User
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                        <form onSubmit={handleSubmit} className="space-y-4" action="#">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                                <input type="text" ref={nameRef} name="name" onChange={handleChange} value={newName} placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" ref={emailRef} name="email" onChange={handleChange} value={newEmail} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                                <input type="hidden" name="id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
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

export default ModalAddUser;