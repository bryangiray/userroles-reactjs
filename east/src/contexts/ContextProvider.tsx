import React, { createContext, useState, ReactNode, useContext } from "react";

export interface Userlevel {
    id: number | null;
    userlevelTitle : string | null;
}

export interface Role {
    id: number;
    userlevelId: number;
    userlevelTitle: string;
    userName?: string;
    userId: number;
}

export interface User {
    name: string;
    email: string;
    firstname?: string;
    lastname?: string;
    roles: Role[] | null;
}

export interface UsersContextType {
    users: User[];
    setUsers: (users: User[]) => void;
}

interface StateContextType {
    currentUser: User | null;
    setUser: (user : User | null) => void,
    userToken: string | null;
    setToken: (token: string | null) => void;
  }

const StateContext = createContext<StateContextType | undefined>(undefined)

interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({children}) => {
    const [currentUser, setUser] = useState<User | null>({
        name: "Bryan Giray",
        email: "bgiray@gmail.com",
        firstname: 'Bryan',
        lastname: 'Giray',
        roles: null,
    });

    const [userToken, setToken] = useState<string | null>('ss');
    return (
        <StateContext.Provider value={{
            currentUser,
            setUser,
            userToken,
            setToken
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const userStateContext = () => useContext(StateContext)