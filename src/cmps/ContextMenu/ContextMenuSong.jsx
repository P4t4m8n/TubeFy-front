import { useState } from "react"
import { Delete, Move } from "../../services/icons.service"


export function ContextMenuSong({ station, item, onChangePlaylist, isSearch, userStations, onRemoveSong, isEdit }) {

    const [isSelectOpen, setSelectOpen] = useState(false)
    return (
        <>
            <li>
                <Move></Move>
            
                <select onChange={(ev) => {
                    onChangePlaylist(ev, item, isSearch)
                }} className="playlist-select">
                    <option value="none">Pick Playlist</option>
                    {userStations.map((userStation, idx) => (

                        (station && station._id === userStation._id) ?
                            <option key={idx} value="same">Current Playlist</option> :
                            <option key={idx} value={idx}>{userStation.name}</option>

                    ))}
                </select>
            </li>
            {(isEdit && !isSearch) && <li className="context-remove" onClick={(ev) => onRemoveSong(ev, item._id)}>
                <Delete></Delete>
                <span>Remove Song</span>
            </li>}
        </>
    )
}