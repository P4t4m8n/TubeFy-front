
import { useEffect, useRef, useState } from 'react'
import { login, signup } from '../../store/actions/user.actions'
import { userService } from '../../services/user.service'
import { Link } from 'react-router-dom'
import { showSuccessMsg } from '../../services/event-bus.service'

export function SignIn({ open, setOpen }) {

  const [isSignup, setIsSignUp] = useState(false)
  const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
  const [userMode, setUserMode] = useState(null)

  const demoUsers = [
    { username: 'DemoUserOne', password: 'a' },
    { username: 'DemoUserTwo', password: 'b' },
    { username: 'DemoUserThree', password: 'c' }
  ]

  function isLogin(ev) {
    ev.preventDefault()
    isSignup ? onSignup(credentials) : onLogin(credentials)
  }

  function handleChange({ target }) {
    const field = target.name
    const value = target.value

    setCredentials(prev => ({ ...prev, [field]: value }))

  }

  async function onLogin(ev) {
    try {
      login(demoUsers[ev.target.value])
      showSuccessMsg({ txt: 'Welcome ' + demoUsers[ev.target.value].username })

    }
    catch (err) { console.log(err) }

  }

  async function onSignup(credentials) {
    try {
      signup(credentials)
      showSuccessMsg({ txt: 'Welcome ' + credentials.username })
    }
    catch (err) { console.log(err) }
  }

  useEffect(() => {

    const closeOnOutsideClick = (ev) => {
      if (open && ev.target.id === 'modalBackdrop') {
        setOpen(false)
      }
    }
    window.addEventListener('click', closeOnOutsideClick)

    return () => window.removeEventListener('click', closeOnOutsideClick)
  }, [open, setOpen])



  const { username, email, password } = credentials

  if (!open) return

  return (
    <div id='modalBackdrop' className="modal-backdrop">
      <div className="modal-content">

        {!userMode &&
          <>
            <button className='mode-btns' onClick={() => setUserMode('real')}>Real user</button>
            <button className='mode-btns' onClick={() => setUserMode('demo')}>Demo User</button>
          </>
        }

        {userMode === 'demo' &&
          <select onChange={onLogin}>
            <option value={0}>-Select user-</option>
            {
              demoUsers.map((user, idx) =>
                <option key={idx} value={idx}>{user.username}</option>)
            }
          </select>
        }

        {userMode === 'real' &&
          <form onSubmit={isLogin}>
            <h2>{isSignup ? 'SignUp' : 'Login'}</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              name='username'
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name='password'
              value={password}
              onChange={handleChange}
            />
            {isSignup && <input
              type="email"
              placeholder="Email"
              name='email'
              value={email}
              onChange={handleChange}
            />}
            <button type="submit">{(isSignup) ? ' Signup' : 'Sign in'}</button>
            <Link href="#" onClick={() => setIsSignUp(!isSignup)} >
              {isSignup ?
                'Already a member? Login' :
                "Don't have an account? Sign Up"
              }
            </Link>
          </form>
        }

      </div>
    </div>
  )
}


