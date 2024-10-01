import React from 'react'
import MenuDashboard from '../components/MenuDashboard'
import '../UserDashboard.css'
import { Outlet } from 'react-router-dom'
const UserDashboard = () => {


    return (
        <>
            <div className={"wrapper"}>
                <MenuDashboard />
                <div className={"main p-3"}>
                    <Outlet />
                </div>
            </div></>
    )
}

export default UserDashboard
