import { useRef, useState } from "react"
import { Delete, Share, Triangle, UserIcon } from "../../services/icons.service"
import { handleKeyboardInteraction } from "../../services/util.service"
import { useContextMenu } from "../CustomHooks/useContextMenu"

export function ContextMenuPlaylist({ item, onRemoveStation, onSendPlaylist }) {
    const friendsList = [
        { username: 'DemoUserTwo', _id: '65e365c9df10adb6d691208b' },
        { username: 'DemoUserThree', _id: '65e365dcdf10adb6d691208d' }
    ]

    const parentRef = useRef(null)
    const childRef = useRef(null)

    const [openFriendsList, setOpenFriendsList] = useState(false)
    const { contextMenuPosition, handleContextMenu } = useContextMenu()

    const openFriendSelect = (ev, isOpen) => {
        if (isOpen) handleContextMenu(ev, null, childRef.current, parentRef.current)
        setOpenFriendsList(isOpen)
    }

    return (
        <>


            <li ref={parentRef}
                onMouseEnter={(ev) => openFriendSelect(ev, true)}
                onMouseLeave={(ev) => openFriendSelect(ev, false)}
                onClick={(ev) => openFriendSelect(ev, true)}
                onFocus={(ev) => openFriendSelect(ev, true)}
                onBlur={(ev) => openFriendSelect(ev, false)}
                className="context-line share grid align-center context-click"
                tabIndex={0}
                aria-haspopup="true"
                aria-expanded={openFriendsList}
            >
                <Share />
                <section className="share-context flex context-click">
                    <span className="context-click">Share Playlist</span>
                    <Triangle />
                </section>
                {openFriendsList && friendsList && friendsList.length > 0 && (
                    <ul ref={childRef} className="share-select flex column context-click"
                        style={{
                            top: `${contextMenuPosition.y}px`,
                            left: `${contextMenuPosition.x}px`

                        }}>
                        {friendsList.map((friend, idx) => (
                            <li
                                key={idx}
                                tabIndex={0}
                                onKeyDown={(ev) => handleKeyboardInteraction(ev, () => onSendPlaylist(ev, item._id, friend._id))}
                                onClick={(ev) => onSendPlaylist(ev, item._id, friend._id)}
                                className='friend context-list flex context-click'
                                aria-label={`Share with ${friend.username}`}
                            >
                                {friend.imgUrl ? <img src={friend.imgUrl} alt={`${friend.username}'s profile`}></img> : <UserIcon />}
                                <span className="context-click">{friend.username}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </li>

            {(item.name !== 'Liked Songs') && <li
                className="context-line grid align-center"
                onClick={(ev) => onRemoveStation(ev, item._id)}
                tabIndex={0}
                onKeyDown={(ev) => handleKeyboardInteraction(ev, () => onRemoveStation(ev, item._id))}
                aria-label="Remove from Library"
            >
                <Delete />
                <span>Remove Playlist</span>
            </li>}
        </>
    )
}
