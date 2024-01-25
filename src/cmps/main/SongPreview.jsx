import { useEffect, useRef, useState } from "react"
import { PlayCard } from "./PlayCard"
import { LikeCard } from "./LikeCard"
import { useSelector } from "react-redux"
import { setContextMenu } from "../../store/actions/app.actions"
import { useDragAndDrop } from "../CustomHooks/useDND"



export function SongPreview({ station, song, idx, isEdit, onChangePlaylist, onRemoveSong, user, id, isSearch = false }) {

    const activeContextMenuId = useSelector(storeState => storeState.appMoudle.playlistContextMenu)
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })
    const [isHover, setIsHover] = useState(false)
    const contextMenuRef = useRef(null)
    const draggableRef = useRef(null)

    const { handleDragStart } = useDragAndDrop()


    function onSetIsHover(ev, hover) {
        ev.preventDefault()
        setIsHover(hover)
    }

    function handleContextMenu(ev) {
        ev.preventDefault()

        const menuWidth = 160
        const menuHeight = 160

        let xPosition = ev.clientX
        let yPosition = ev.clientY

        if (xPosition + menuWidth > window.innerWidth) {
            xPosition = ev.clientX - menuWidth
        }

        if (yPosition + menuHeight > window.innerHeight) {
            yPosition = ev.clientY - menuHeight
        }

        setContextMenu(song.trackId)
        setContextMenuPosition({ x: xPosition, y: yPosition })
    }

    function handleClickOutside(ev) {
        if (contextMenuRef.current && !contextMenuRef.current.contains(ev.target)) {
            setContextMenu(null)
        }
    }

    useEffect(() => {
        window.addEventListener('click', handleClickOutside)
        return () => {
            window.removeEventListener('click', handleClickOutside)
        }
    }, [])



    return (

        <li ref={draggableRef} key={idx} className="station-details-list" item={{ ...song }} draggable onDragStart={(ev) => handleDragStart(ev, song, station,draggableRef)}
            onMouseEnter={((ev) => onSetIsHover(ev, true))}
            onMouseLeave={(ev) => onSetIsHover(ev, false)}
            onContextMenu={handleContextMenu}
        >
            <p >{isHover ? <PlayCard item={song}></PlayCard> : idx + 1}</p>
            <div className="artist-and-image grid">  <div className="img-list-con"><img src={song.imgUrl} /> </div>{song.name}</div>
            <p >
                {song.artist}</p>
            <p>{song.album}</p>

            <div className="details-list-control">
                <LikeCard item={song}></LikeCard>
                <p>{song.duration}</p>

            </div>

            {activeContextMenuId === song.trackId && (
                <ul ref={contextMenuRef} className="context-menu" style={{ position: 'absolute', top: `${contextMenuPosition.y}px`, left: `${contextMenuPosition.x}px` }}>
                    <li>
                        <select onChange={(ev) => {
                            setContextMenu(null)
                            onChangePlaylist(ev, song, id, isSearch)
                        }} className="playlist-select">
                            <option value="none">Pick Playlist</option>
                            {user.stations.map((station, idx) => (
                                station._id === id ?
                                    <option key={idx} value="same">Current Playlist</option> :
                                    <option key={idx} value={idx}>{station.name}</option>

                            ))}
                        </select>
                    </li>
                    {isEdit && <li onClick={(ev) => onRemoveSong(ev, song._id)}>Remove Song</li>}
                </ul>
            )}
        </li>
    )
}