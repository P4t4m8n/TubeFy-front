import { memo, useRef, useState } from "react"
import { PlayCard } from "./PlayCard"
import { LikeCard } from "./LikeCard"
import { useDragAndDrop } from "./CustomHooks/useDND"
import { useContextMenu } from "./CustomHooks/useContextMenu"
import { ContextMenu } from "./ContextMenu/ContextMenu"
import { VertDots } from "../services/icons.service"

export const SongPreview = memo(({ station, song, idx, isEdit, onChangePlaylist, onRemoveSong, user, id, isSearch = false }) => {

    const [isHover, setIsHover] = useState(false)
    const draggableRef = useRef(null)

    const {activeContextMenuId, contextMenuPosition, handleContextMenu}
        = useContextMenu()

    const { handleDragStart } = useDragAndDrop()

    function onSetIsHover(ev, hover) {
        ev.preventDefault()
        setIsHover(hover)
    }

    return (

        <li ref={draggableRef} key={idx} className="station-details-list" item={{ ...song }} draggable onDragStart={(ev) => handleDragStart(ev, song, station, draggableRef)}
            onMouseEnter={((ev) => onSetIsHover(ev, true))}
            onMouseLeave={(ev) => onSetIsHover(ev, false)}
            onContextMenu={(ev)=>handleContextMenu(ev,song)}
        >
            <p className="hover-index" >{isHover ? <PlayCard item={song}></PlayCard> : idx + 1}</p>
            <div className="artist-and-image grid">
                <div className="img-list-con">
                    <img src={song.imgUrl} />
                </div><p>{song.name}</p></div>
            <p >
                {song.artist}</p>

            <div className="details-list-control">
                <LikeCard item={song}></LikeCard>
                <p>{song.duration}</p>
                <button className="mobile-context" onClick={(ev)=>handleContextMenu(ev,song)}>
                    <VertDots></VertDots>

                </button>

            </div>

            {(activeContextMenuId === song._id && user) &&
                <ContextMenu
                    id={id}
                    isSearch={isSearch}
                    onChangePlaylist={onChangePlaylist}
                    item={song}
                    userStations={user.stations}
                    contextMenuPosition={contextMenuPosition}
                    onRemoveSong={onRemoveSong}
                    isEdit={isEdit}
                    station={station}
                />
            }
        </li>
    )
})