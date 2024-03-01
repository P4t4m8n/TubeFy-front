import { useRef, useState } from "react"
import { Delete, Move, Triangle } from "../../services/icons.service"
import { useContextMenu } from "../CustomHooks/useContextMenu"

export function ContextMenuSong({ item, onChangePlaylist, isSearch, userStations, onRemoveSong, isEdit }) {
    const parentRef = useRef(null)
    const childRef = useRef(null)

    const [isPlaylistSelectOpen, setIsPlaylistSelectOpen] = useState(false)
    const { contextMenuPosition, handleContextMenu } = useContextMenu()

    const openPlaylistSelect = (ev, isOpen) => {
        ev.preventDefault()
        if (isOpen) handleContextMenu(ev, null, childRef.current, parentRef.current)
        setIsPlaylistSelectOpen(isOpen)
    }

    return (
        <>
            <li ref={parentRef} className="pick-playlist grid align-center context-click"
                onMouseEnter={(ev) => openPlaylistSelect(ev, true)} tabIndex={0}
                onMouseLeave={(ev) => openPlaylistSelect(ev, false)}
                onClick={(ev) => openPlaylistSelect(ev, true)}
                onKeyDown={(ev) => ev.key === 'Enter' && openPlaylistSelect(ev, true)}>

                <Move />
                <section className="text-cont flex align-center context-click">
                    <p className="context-click">Pick Playlist</p>
                    <Triangle />
                </section>
                {isPlaylistSelectOpen && (

                    <ul  ref={childRef} style={{
                        top: `${contextMenuPosition.y}px`,
                        left: `${contextMenuPosition.x}px`

                    }} className="playlist-select flex column context-click">
                        {userStations.map((userStation, idx) => (
                            <li className="context-click" key={idx} tabIndex={0}
                                onKeyDown={(ev) => ev.key === 'Enter' && onChangePlaylist(idx, item, isSearch)}>

                                <button className="context-click" onClick={(ev) => onChangePlaylist(idx, item, isSearch)}>
                                    {userStation.name}
                                </button>

                            </li>
                        ))}
                    </ul>
                )}
            </li>

            {isEdit && !isSearch && (

                <li className="context-remove grid align-center context-click" onClick={() => onRemoveSong(item._id)}
                    tabIndex={0} onKeyDown={(ev) => ev.key === 'Enter' && onRemoveSong(item._id)}>
                    <Delete />
                    <span className="context-click">Remove Song</span>
                </li>

            )}
        </>
    )
}
