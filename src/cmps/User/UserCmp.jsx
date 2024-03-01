import { useNavigate } from "react-router-dom";
import { UserIcon } from "../../services/icons.service";
import { logout } from "../../store/actions/user.actions";
import { showSuccessMsg } from "../../services/event-bus.service";

export function UserCmp({ user }) {

    const navigate = useNavigate()

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

    const { imgUrl } = user

    return (
        < section className='user-nav' >
            <button onClick={onLogout}>Logout</button>
            <div className='avatar'>
                {imgUrl ?
                    <img src={imgUrl}></img>
                    :
                    <UserIcon></UserIcon>}
            </div>
        </ section >
    )
}