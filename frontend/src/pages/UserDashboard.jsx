import React from 'react'
import MenuDashboard from '../components/MenuDashboard'
import '../UserDashboard.css'
import { Outlet } from 'react-router-dom'
const UserDashboard = ({ user }) => {


    return (
        <>
            <div className={"wrapper"}>
                <MenuDashboard user={user} />
                <div className={"main p-3"}>
                    <Outlet />
                </div>
            </div></>
    )
}

export default UserDashboard
