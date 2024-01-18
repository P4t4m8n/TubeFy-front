import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { signup } from '../../store/actions/user.actions.js'
import { userService } from "../../services/user.service.js"


export function Signup() {

    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const navigate = useNavigate()

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials(credentials => ({ ...credentials, [field]: value }))
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        try {
           const t = await signup(credentials)
            console.log("t:", t)
            navigate('/')
        }
        catch (err) { console.log(err) }
    }


    return (
        <form className="login-form" onSubmit={onSubmit}>
            <label>Email address</label><br />
            <input
                type="email"
                name="email"
                value={credentials.email}
                placeholder="email"
                onChange={handleCredentialsChange}
                required
                autoFocus
            />
            <label>password </label><br />
            <input
                type="password"
                name="password"
                value={credentials.password}
                placeholder="Password"
                onChange={handleCredentialsChange}
                required
                autoComplete="off"
            />
            <label> <span>Name</span><br />This name will be displayed on your profile </label><br />
            <input
                type="text"
                name="username"
                value={credentials.username}
                placeholder="Name"
                onChange={handleCredentialsChange}
                required
            />
            <button className="submit">Signup</button>
        </form>
    )
}