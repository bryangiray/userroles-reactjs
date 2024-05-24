import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from './router.tsx'
import { RouterProvider } from 'react-router-dom'
import { ContextProvider } from './contexts/ContextProvider.tsx'
import { UsersProvider } from './contexts/UsersProvider.tsx'
import { RoleContextProvider } from './contexts/RoleProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextProvider>
      <UsersProvider>
        <RoleContextProvider>
          <RouterProvider router={router} />
        </RoleContextProvider>
      </UsersProvider>
    </ContextProvider>
    
  </React.StrictMode>,
)
