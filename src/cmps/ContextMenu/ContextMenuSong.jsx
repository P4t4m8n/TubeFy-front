

export function ContextMenuSong({ item, onChangePlaylist, id, isSearch,userStations,onRemoveSong,isEdit }) {

    return (
        <>
            <li>
                <select onChange={(ev) => {
                    onChangePlaylist(ev, item, id, isSearch)
                }} className="playlist-select">
                    <option value="none">Pick Playlist</option>
                    {userStations.map((station, idx) => (
                        station._id === id ?
                            <option key={idx} value="same">Current Playlist</option> :
                            <option key={idx} value={idx}>{station.name}</option>

                    ))}
                </select>
            </li>
            {isEdit && <li onClick={(ev) => onRemoveSong(ev, song._id)}>Remove Song</li>}
        </>

    )
}