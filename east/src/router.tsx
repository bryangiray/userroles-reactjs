import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Home from "./pages/Home";
import GuestLayout from "./components/GuestLayout";
import AdminLayout from "./components/AdminLayout";
import User from "./pages/User";
import Profile from "./pages/Profile";
import UserRole from "./pages/UserRole";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AdminLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },

            {
                path: 'users',
                element: <User />
            },
            {
                path: 'userroles',
                element: <UserRole />
            },
            {
                path: 'profile',
                element: <Profile />
            }

        ]

    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register/>
            }
        ]

    },
    {
        path: '/admin',
        element: <AdminLayout/>,
        children: [
            {
                path: 'users',
                element: <User />
            }
        ]
    },
   

])

export default router