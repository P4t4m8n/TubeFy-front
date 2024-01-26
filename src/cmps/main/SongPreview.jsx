import { useRef, useState } from "react"
import { PlayCard } from "./PlayCard"
import { LikeCard } from "./LikeCard"
import { useDragAndDrop } from "../CustomHooks/useDND"
import { useContextMenu } from "../CustomHooks/useContextMenu"
import { ContextMenu } from "../ContextMenu/ContextMenu"

export function SongPreview({ station, song, idx, isEdit, onChangePlaylist, onRemoveSong, user, id, isSearch = false }) {

    const [isHover, setIsHover] = useState(false)
    const draggableRef = useRef(null)

    const [activeContextMenuId, contextMenuPosition, handleContextMenu]
        = useContextMenu({ item: song })

    const { handleDragStart } = useDragAndDrop()

    function onSetIsHover(ev, hover) {
        ev.preventDefault()
        setIsHover(hover)
    }


    return (

        <li ref={draggableRef} key={idx} className="station-details-list" item={{ ...song }} draggable onDragStart={(ev) => handleDragStart(ev, song, station, draggableRef)}
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

            {activeContextMenuId === song.trackId &&
                <ContextMenu
                    id={id}
                    isSearch={isSearch}
                    onChangePlaylist={onChangePlaylist}
                    item={song} userStations={user.stations}
                    contextMenuPosition={contextMenuPosition}
                    onRemoveSong={onRemoveSong}
                    isEdit={isEdit}
                />
            }
        </li>
    )
}