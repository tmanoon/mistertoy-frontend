import { NavLink } from 'react-router-dom'
import { LoginSignup } from '../cmps/LoginSignup.jsx'

export function AppHeader() {

    return <>
        <header className="header-section flex align-center space-between">
            <div>Toys</div>
            <nav className="flex">
                <NavLink to="/" >Home</NavLink>
                <NavLink to="/about" >About</NavLink>
                <NavLink to="/toy" >Toys</NavLink>
                <NavLink to="/toy/dashboard" >Dashboard</NavLink>
            </nav>
        </header >

        <LoginSignup />
    </>
}