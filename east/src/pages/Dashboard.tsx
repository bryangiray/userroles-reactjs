import React, {useState, useEffect} from "react"
import PageComponent from "../components/PageComponent"

const module: string = 'Dashboard'
const Dashboard = () => { 
    return (
        <>
            <PageComponent title="Dashboard">
                <div>Click Users from the Menu</div>
            </PageComponent>
        </>
    )
}

export default Dashboard