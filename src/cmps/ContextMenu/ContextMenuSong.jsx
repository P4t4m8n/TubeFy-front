import { useRef, useState } from "react"
import { Delete, Move, Triangle } from "../../services/icons.service"
import { useContextMenu } from "../CustomHooks/useContextMenu"

export function ContextMenuSong({ item, onChangePlaylist, isSearch, userStations, onRemoveSong, isEdit }) {
    const parentRef = useRef(null)
    const childRef = useRef(null)

    const [isPlaylistSelectOpen, setIsPlaylistSelectOpen] = useState(false)
    const { contextMenuPosition, handleContextMenu } = useContextMenu()

    const openPlaylistSelect = (ev, isOpen) => {
        if (isOpen) handleContextMenu(ev, null, childRef.current, parentRef.current)
        setIsPlaylistSelectOpen(isOpen)
    }

    return (
        <>
            <li ref={parentRef} className="pick-playlist grid align-center" onMouseEnter={(ev) => openPlaylistSelect(ev, true)} tabIndex={0}
                onMouseLeave={(ev) => openPlaylistSelect(ev, false)}
                onKeyDown={(ev) => ev.key === 'Enter' && openPlaylistSelect(ev, true)}>

                <Move />
                <section className="text-cont flex align-center">
                    <p>Pick Playlist</p>
                    <Triangle />
                </section>
                {isPlaylistSelectOpen && (

                    <ul ref={childRef} style={{
                        top: `${contextMenuPosition.y}px`,
                        left: `${contextMenuPosition.x}px`

                    }} className="playlist-select flex column">
                        {userStations.map((userStation, idx) => (
                            <li key={idx} tabIndex={0}
                                onKeyDown={(ev) => ev.key === 'Enter' && onChangePlaylist(idx, item, isSearch)}>

                                <button onClick={(ev) => onChangePlaylist(idx, item, isSearch)}>
                                    {userStation.name}
                                </button>

                            </li>
                        ))}
                    </ul>
                )}
            </li>

            {isEdit && !isSearch && (

                <li className="context-remove grid align-center" onClick={() => onRemoveSong(item._id)}
                    tabIndex={0} onKeyDown={(ev) => ev.key === 'Enter' && onRemoveSong(item._id)}>
                    <Delete />
                    <span>Remove Song</span>
                </li>

            )}
        </>
    )
}
