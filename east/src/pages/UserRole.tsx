import React, { useEffect, useState } from "react"
import PageComponent from "../components/PageComponent"
import { Userlevel } from "../contexts/ContextProvider"
import api from "../api"


const UserRole = () => {
    const [userLevels, setUserlevels] = useState<Userlevel[]>([]);

    useEffect(() => {
        fetchUserlevels()
    },[])

    const fetchUserlevels = async() => {
        try {
            const response = await api.get(`userlevels/get`);
            if (typeof response.data.userlevels == 'object') {
                setUserlevels(response.data.userlevels)
            }
          } catch (error) {
            console.error('Error fetching location data:', error);
          }
    }
    
    return (
        <>
        <PageComponent title="User Roles">
            <table className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="bg-gray-100">
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">User Role</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase"></th>
                        </tr>
                </thead>
                <tbody>
                {userLevels.map((userLevel) => (
                    <tr key={userLevel.id}>
                        <td className="py-4 px-6 border-b border-gray-200"> {userLevel.userlevelTitle} </td>
                        <td className="py-4 px-6 border-b border-gray-200"></td>
                    </tr> 
                ))}
                </tbody>
            </table>
        </PageComponent>
    </>
    )
}

export default UserRole