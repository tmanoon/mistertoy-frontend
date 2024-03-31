import { useEffect, useState } from "react"
import { userService } from "../services/user.service.js"
import { Link, useNavigate, useParams } from "react-router-dom"

export function UserDetails() {
    const [user, setUser] = useState(null)
    const { userId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (userId) loadUser()
    }, [userId])

    async function loadUser() {
        try {
            const user = await userService.getById(userId)
            console.log(user)
            setUser(user)
        } catch (err) {
            console.log('Had issues in user details', err)
            navigate('/')
        }
    }

    if (!user) return <div>Loading...</div>

    const loggedInUser = userService.getLoggedInUser()
    const isMyProfile = loggedInUser && loggedInUser._id === userId
    return (
        <section className="user-details">
            <h1>Fullname: {user.fullname}</h1>
            <h2>Id: {user._id}</h2>
            {isMyProfile && (
                <section>
                    <h2>My Stuff!</h2>
                </section>
            )}
            <Link to="/">Home</Link>
        </section>
    )
}