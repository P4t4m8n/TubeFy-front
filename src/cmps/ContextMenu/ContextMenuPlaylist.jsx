import { useRef, useState } from "react"
import { Delete, Share, Triangle, UserIcon } from "../../services/icons.service"
import { handleKeyboardInteraction } from "../../services/util.service"
import { useContextMenu } from "../CustomHooks/useContextMenu"

export function ContextMenuPlaylist({ item, onRemoveStation, onSendPlaylist }) {
    const friendsList = [
        { username: 'DemoUserTwo', _id: '65c61d710580cb91dd88eadb' },
        { username: 'DemoUserThree', _id: '65c61da00580cb91dd88eadd' }
    ]

    const parentRef = useRef(null)
    const childRef = useRef(null)

    const [openFriendsList, setOpenFriendsList] = useState(false)
    const { contextMenuPosition, handleContextMenu } = useContextMenu()

    const openPlaylistSelect = (ev, isOpen) => {
        if (isOpen) handleContextMenu(ev, null, childRef.current, parentRef.current)
        setOpenFriendsList(isOpen)
    }

    return (
        <>


            <li ref={parentRef}
                onMouseEnter={(ev) => openPlaylistSelect(ev, true)}
                onMouseLeave={(ev) => openPlaylistSelect(ev, false)}
                onFocus={(ev) => openPlaylistSelect(ev, true)}
                onBlur={(ev) => openPlaylistSelect(ev, false)}
                className="context-line share grid align-center"
                tabIndex={0}
                aria-haspopup="true"
                aria-expanded={openFriendsList}
            >
                <Share />
                <section className="share-context flex">
                    <span>Share Playlist</span>
                    <Triangle />
                </section>
                {/* {openFriendsList && friendsList && friendsList.length > 0 && ( */}
                <ul ref={childRef} className="share-select flex column"
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
                            className='friend context-list flex'
                            aria-label={`Share with ${friend.username}`}
                        >
                            {friend.imgUrl ? <img src={friend.imgUrl} alt={`${friend.username}'s profile`}></img> : <UserIcon />}
                            <span>{friend.username}</span>
                        </li>
                    ))}
                </ul>
                {/* )} */}
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
