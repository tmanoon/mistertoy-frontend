import { NavLink } from 'react-router-dom'
import { LoginSignup } from '../cmps/LoginSignup.jsx'
import { userService } from '../services/user.service.js'
import { useState, useEffect } from 'react'

export function AppHeader() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const loggedInuUser = userService.getLoggedinUser()
        console.log(loggedInuUser)
        if(loggedInuUser) setUser(loggedInuUser)
    }, [])

    return <>
        <header className="header-section flex align-center space-between">
            <div>Toys</div>
            <nav className="flex">
                <NavLink to="/" >Home</NavLink>
                <NavLink to="/about" >About</NavLink>
                <NavLink to="/toy" >Toys</NavLink>
                <NavLink to="/toy/dashboard" >Dashboard</NavLink>
                {user && <NavLink to={`/user/${user._id}`}>Profile</NavLink>}
            </nav>
        </header >

        <LoginSignup />
    </>
}