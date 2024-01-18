import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { login } from '../../store/actions/user.actions.js'
import { userService } from "../../services/user.service.js"


export function Login() {

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
            await login(credentials)
            console.log('looged in')
            navigate('/')
        }
        catch (err) { console.log(err) }
    }

console.log('render login')
    return (
        <form className="login-form" onSubmit={onSubmit}>
            <label>Email address or name</label><br />
            <input
                type="text"
                name="username"
                value={credentials.username}
                placeholder="Username or email"
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
           
            <button className="submit">Login</button>
        </form>
    )
}