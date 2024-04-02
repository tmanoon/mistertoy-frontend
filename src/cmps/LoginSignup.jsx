import { login, logout, signup } from '../store/actions/user.actions'
import { getLoggedInUser } from '../store/actions/user.actions'
import { useState } from 'react'
import { useFormik } from 'formik'
import { userService } from '../services/user.service.js'
import { loginSchema, signupSchema } from '../schemas/loginSignupSchema.js'

export function LoginSignup() {
    const [loggedInUser, setLoggedInUser] = useState(getLoggedInUser())
    const [isSignup, setSignup] = useState(false)

    const initialValues = userService.getEmptyCredentials()
    const { values, errors, setValues, handleChange, handleBlur } = useFormik({
        initialValues,
        validationSchema: isSignup ? signupSchema : loginSchema
    })

    async function onLogoutUser(e) {
        try {
            e.stopPropagation()
            await logout(values)
            setLoggedInUser(getLoggedInUser())
            setValues(userService.getEmptyCredentials())
        } catch (err) {
            console.log(err)
        }
    }

    function onSignupUser(e) {
        e.preventDefault()
        setSignup(isSignup => !isSignup)
    }

    async function onSetUser(e) {
        try {
            e.preventDefault()
            !values.fullname ? await login(values) : await signup(values)
            setLoggedInUser(getLoggedInUser())
        } catch (err) {
            console.log(err => console.log(err))
        }
    }

    return (
        <div className='login-signup-container flex align-center'>
            {loggedInUser &&
                <div>
                    <p>Hello {loggedInUser.fullname}</p>
                    <p>your score is: {loggedInUser.score}</p>
                    <p>We hope you enjoy your time here. Don't forget to logout by clicking <span className="click-logout" onClick={onLogoutUser}>here</span> whenever you plan to quit.</p>
                </div>}

            {!loggedInUser && <div>
                Please log in here:
                <div>
                    <form className='flex form-login-signup' onSubmit={onSetUser}>
                        <input
                            value={values.username}
                            type="text" name="username"
                            placeholder="Enter your username"
                            onChange={handleChange}
                            className={errors.username ? 'error-input' : ''}
                            onBlur={handleBlur} />
                        <input
                            value={values.password}
                            type="password"
                            name="password"
                            placeholder="Your password"
                            onChange={handleChange}
                            className={errors.password ? 'error-input' : ''}
                            onBlur={handleBlur} />
                        {isSignup &&
                            <input value={values.fullname}
                                type="text"
                                name="fullname"
                                placeholder="Your full name"
                                onChange={handleChange}
                                className={errors.fullname ? 'error-input' : ''}
                                onBlur={handleBlur} />}
                        <button>{isSignup ? 'Sign up' : 'Login'}</button>
                    </form>
                    <span>Not a user yet? Click <span className='click-signup' onClick={onSignupUser}>here </span> to sign up.</span>
                </div>
            </div>}
        </div>
    )
}
