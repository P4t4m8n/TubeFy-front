import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { logout } from '../store/actions/user.actions.js'
import { UserIcon } from '../services/icons.service.jsx'
import { showSuccessMsg } from '../services/event-bus.service.js'
import { SearchCmp } from './search/SearchCmp.jsx'
import { NoUserCmp } from './NoUserCmp.jsx'

export function AppHeader() {

    const user = useSelector(storeState => storeState.userMoudle.userObj)
    const [open, setOpen] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()
    const isSearchShown = location.pathname.includes('search')

    async function onLogout(ev) {
        ev.preventDefault()
        ev.stopPropagation()

        try {
            await logout()
            setOpen(false)
            navigate('/')
            showSuccessMsg({ txt: 'Goodbye' })
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="app-header">
            {isSearchShown && <SearchCmp />}
            <section className='user-acess'>
                {user ? (
                    < section className='user-nav' >
                        <button onClick={onLogout}>Logout</button>
                        <div className='avatar'>
                            {user.imgUrl ?
                                <img src={user.imgUrl}></img>
                                :
                                <UserIcon></UserIcon>}
                        </div>
                    </ section >
                ) : (
                    <NoUserCmp open={open} setOpen={setOpen} />
                )}
            </section>
        </div >


    )
}

