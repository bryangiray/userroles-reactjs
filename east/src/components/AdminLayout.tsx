import { Disclosure, Menu, Transition } from "@headlessui/react"
import { useEffect, useState } from "react";
import { NavLink,Outlet, useNavigate } from "react-router-dom"
import { userStateContext } from "../contexts/ContextProvider";
import { CiUser } from "react-icons/ci";

type menuItem = {
    label: string;
    path: string;
    icon?: string;
}

const navigation: menuItem[] = [
    { label: "Dashboard", path: "/dashboard"},
    { label: "Users", path: "/users"},
    { label: "Roles", path: "/userroles"},
]

const userNav: menuItem[] = [
    {label: 'Profile', path: '/profile'},
]


const AdminLayout = () => {
    const navigate = useNavigate();

    const { currentUser, userToken } = userStateContext() || { currentUser: null, userToken: null };
    
    console.log(currentUser)
    console.log(userToken)
    useEffect(() => {
        if (!userToken) {
            navigate('/login');
        }
    },[userToken]) 
    


    const handleSignout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate('/login');
    }

    function classNames(...classes: (string | undefined | null | false)[]): string {
        return classes.filter(Boolean).join(' ')
    }
    
    return (
        <>
            <div className="min-h-full">
                <nav className="bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img className="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"/>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                            { /** Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white"*/}
                            { navigation.map((item, index) =>(
                                 <NavLink 
                                    key={index}
                                    to={item.path}
                                    className={({isActive}) => classNames(
                                        isActive
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'px-3 py-2 rounded-md text-sm font-medium'
                                    )}
                                 > {item.label}
                                 </NavLink>
                               
                            ))}
                            </div>
                        </div>
                        </div>
                        <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5"></span>
                            <span className="sr-only">View notifications</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                            </svg>
                            </button>

                            { /** Profile dropdown*/}
                            <div className="relative ml-3">
                            <Disclosure>
                                <Disclosure.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">Open user menu</span>
                                    <CiUser className="text-white" />
                                </Disclosure.Button>
                                <Disclosure.Panel className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    { userNav.map((item,index) => (
                                            <NavLink
                                                key={index}
                                                to={item.path}
                                                className={({isActive}) => classNames(
                                                    isActive
                                                    ? 'text-black'
                                                    : 'text-gray-500',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                                >
                                                {item.label}

                                            </NavLink>
                                            
                                        ))}
                                        <a href="#" onClick={handleSignout}className="block px-4 py-2 text-smblock px-4 py-2 text-sm">Sign-out</a>
                                </Disclosure.Panel>
                            </Disclosure>
                            </div>
                            
                        </div>
                        </div>
                        
                    </div>
                    </div>

                    { /** Mobile menu, show/hide based on menu state.*/}
                    <Disclosure >
                        {({ open }) => (
                        <>
                            <Disclosure.Button style={{right: '15px', top: '15px', position: 'absolute'}} className="block sm:hidden relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-0.5"></span>
                                    <span className="sr-only">Open main menu</span>
                                    { /** Menu open: "hidden", Menu closed: "block"*/}
                                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                    { /** Menu open: "block", Menu closed: "hidden"*/}
                                    <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                            </Disclosure.Button>
                            <Disclosure.Panel className="md:hidden" id="mobile-menu">
                                 <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    { navigation.map((item, index) =>(
                                        <NavLink 
                                        key={index}
                                        to={item.path}
                                        className={({isActive}) => classNames(
                                            isActive
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                        > {item.label}
                                        </NavLink>
                                        
                                    ))}
                                 </div>
                                 <div className="border-t border-gray-700 pb-3 pt-4">
                                    <div className="flex items-center px-5">
                                    <div className="flex-shrink-0">
                                        <CiUser className="text-white" />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium leading-none text-white">{currentUser?.name}</div>
                                        <div className="text-sm font-medium leading-none text-gray-400">{currentUser?.email}</div>
                                    </div>
                                    <button type="button" className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="absolute -inset-1.5"></span>
                                        <span className="sr-only">View notifications</span>
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                        </svg>
                                    </button>
                                    </div>
                                    <div className="mt-3 space-y-1 px-2">
                                    
                                    { userNav.map((item,index) => (
                                        <NavLink
                                            key={index}
                                            to={item.path}
                                            className={({isActive}) => classNames(
                                                isActive
                                                ? 'text-white hover:bg-gray-700 hover:text-white'
                                                : 'text-gray-400 hover:bg-gray-700 hover:text-white',
                                                'block rounded-md px-3 py-2 text-base font-medium'
                                            )}
                                            >
                                            {item.label}

                                        </NavLink>
                                    ))}
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                        )}
                    </Disclosure>
                        <div className="md:hidden" id="mobile-menu">
                            
                            
                        </div>
             
                    
                </nav>
                
                <Outlet />
            </div>
            
        </>
    )
}

export default AdminLayout