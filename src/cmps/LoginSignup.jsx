import { login, logout, signup } from '../store/actions/user.actions'
import { userService } from '../services/user.service.js'
import { useState } from 'react'

export function LoginSignup() {
    const [loggedInUser, setLoggedInUser] = useState(userService.getLoggedinUser())
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [isSignup, setSignup] = useState(false)

    function onSignupUser(e) {
        e.preventDefault()
        setSignup(isSignup => !isSignup)
    }

    function onLoginSignupUser(e) {
        e.stopPropagation()
        const { name, value } = e.target
        setCredentials(prevCredentials => ({ ...prevCredentials, [name]: value }))
    }

    async function onSetUser(e) {
        try {
            e.preventDefault()
            !credentials.fullname ? await login(credentials) : await signup(credentials)
        } catch (err) {
            console.log(err => console.log(err))
        }
    }

    return (
        <div>
            {loggedInUser &&
                <div>
                    <p>Hello {loggedInUser.fullname}</p>
                    <p>We hope you enjoy your time here.</p>
                </div>}

            {!loggedInUser && <div>
                Please log in here:
                <div>
                    <form onSubmit={onSetUser}>
                        <input value={credentials.username} type="text" name="username"
                            placeholder="Enter your username" onChange={onLoginSignupUser} />
                        <input value={credentials.password} type="password" name="password"
                            placeholder="Your password" onChange={onLoginSignupUser} />
                        {isSignup &&
                            <input value={credentials.fullname} type="text" name="fullname"
                                placeholder="Your full name" onChange={onLoginSignupUser} />}
                        <button>Login</button>
                    </form>
                    <span>Not a user yet? Click <span className='click-signup' onClick={onSignupUser}>here </span> to sign up.</span>
                </div>
            </div>}
        </div>
    )
}