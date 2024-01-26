import { useState } from "react";
import { Delete, Share, UserIcon } from "../../services/icons.service";
import { setContextMenu } from "../../store/actions/app.actions";


export function ContextMenuPlaylist({ item, onRemoveStation, onSendPlaylist }) {


    const friendsList = [
        { username: 'DemoUserTwo', _id: '65b39afa910e647be4086e97' },
        { username: 'DemoUserThree', _id: '65b0e96d9d067b8be3e177ac' }
    ]

    const [openFreindsList, setOpenFriendsList] = useState(false)

    return (
        <>
            <li className="context-line" onClick={(ev) => onRemoveStation(ev, item._id)}>
                <Delete></Delete>
                <span>Remove from Libary</span>
            </li>

            <li
                onMouseEnter={() => setOpenFriendsList(true)}
                onMouseLeave={() => setOpenFriendsList(false)}
                className="context-line share"
            >
                <Share></Share>
                <span>Share With Friends</span>
                {
                    openFreindsList && friendsList && friendsList.length &&
                    <ul className="share-select">
                        {friendsList.map((friend, idx) => (
                            <li onClick={(ev) => onSendPlaylist(ev, item._id, friend._id)} className='friend context-list' key={idx} >
                                {friend.imgUrl ? <img src={friend.imgUrl}></img> : <UserIcon></UserIcon>}
                                <h6> {friend.username}</h6>
                            </li>
                        ))}
                    </ul>
                }
            </li>
        </>
    )
}