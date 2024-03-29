import { Link } from "react-router-dom";
import { Note } from "../../services/icons.service";
import { ContextMenu } from "../ContextMenu/ContextMenu";
import { useContextMenu } from "../CustomHooks/useContextMenu";
import { useRef } from "react";
import { useDragAndDrop } from "../CustomHooks/useDND"


export function UserLibaryPreivew(props) {

    const { handleDragOver, handleDrop } = useDragAndDrop()
    const { setStationInFoucs, onRemoveStation, station, stationInFoucs, userStations, onSendPlaylist } = props
    const parentRef = useRef(null)
    const { activeContextMenuId, contextMenuPosition, handleContextMenu } = useContextMenu(parentRef)

    return (
        <Link ref={parentRef}
            onClick={() => setStationInFoucs(station)}
            key={station._id}
            to={'/station/edit/' + station._id}
            onDragOver={handleDragOver}
            onDrop={(ev) => handleDrop(ev, station)}
            onContextMenu={(ev) => handleContextMenu(ev, station)}
        >
            <li key={station._id} className={`grid station-preview ${(stationInFoucs && stationInFoucs._id === station._id) ? 'active-class' : ''}`}>

                {station.imgUrl ?
                    <img className="station-image-left-sidebar" src={station.imgUrl}></img> :
                    <div className="svg-box">
                        <Note></Note>
                    </div>
                }
                <header className="station-name">{station.name}</header>
                <div className="station-info-span">

                    <span className="station-type">{station.type}</span>
                    <span>{station.songs.length} songs</span>

                </div>

                {activeContextMenuId === station._id &&
                    <ContextMenu
                        onRemoveStation={onRemoveStation}
                        item={station} userStations={userStations}
                        contextMenuPosition={contextMenuPosition}
                        onSendPlaylist={onSendPlaylist}
                    />
                }

            </li>
        </Link>
    )
}