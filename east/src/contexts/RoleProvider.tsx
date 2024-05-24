// RoleContextProvider.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Role } from './ContextProvider'

interface RoleContextType {
    currentRole: Role | null;
    setCurrentRole: React.Dispatch<React.SetStateAction<Role | null>>;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useRoleContext = () => {
    const context = useContext(RoleContext);
    if (!context) {
        throw new Error('useRoleContext must be used within a RoleContextProvider');
    }
    return context;
};

interface ContextProviderProps {
    children: ReactNode;
}

export const RoleContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [currentRole, setCurrentRole] = useState<Role | null>(null);
    
    return (
        <RoleContext.Provider value={{ currentRole, setCurrentRole }}>
            {children}
        </RoleContext.Provider>
    );
};


export const roleStateContext = () => useContext(RoleContext)