import { Link } from "react-router-dom";
import { Delete, Note } from "../../services/icons.service";
import { ContextMenu } from "../ContextMenu/ContextMenu";
import { UseContextMenu } from "../CustomHooks/useContextMenu";

export function SidebarContentPreview(props) {

    const { setStationInFoucs, handleDrop, handleDragOver, onRemoveStation, station, stationInFoucs, userStations, onSendPlaylist } = props

    const [activeContextMenuId, contextMenuPosition, handleContextMenu]
        = UseContextMenu({ item: station })

    return (
        <Link
            onClick={() => setStationInFoucs(station)}
            key={station._id}
            to={'/station/edit/' + station._id}
            onDragOver={handleDragOver}
            onDrop={(ev) => handleDrop(ev, station)}
            onContextMenu={handleContextMenu}
        >
            <li key={station._id} className={`grid station-preview ${(stationInFoucs && stationInFoucs._id === station._id) ? 'active-class' : ''}`}>

                {station.imgUrl ?
                    <img className="station-image-left-sidebar" src={station.imgUrl}></img> :
                    <div className="svg-box">
                        <Note></Note>
                    </div>
                }
                <header>{station.name}</header>
                <div>

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