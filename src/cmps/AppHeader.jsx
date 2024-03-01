import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { SearchCmp } from './search/SearchCmp.jsx'
import { NoUserCmp } from './NoUserCmp.jsx'
import { UserCmp } from './UserCmp.jsx'

export function AppHeader() {

    const user = useSelector(storeState => storeState.userMoudle.userObj)
    const [open, setOpen] = useState(false)

    const location = useLocation()
    const isSearchShown = location.pathname.includes('search')

    return (
        <div className="app-header">
            {isSearchShown && <SearchCmp />}
            <section className='user-acess'>
                {user ? (
                    <UserCmp user={user} />
                ) : (
                    <NoUserCmp open={open} setOpen={setOpen} />
                )}
            </section>
        </div >


    )
}

