

export function ContextMenuSong({ station, item, onChangePlaylist, isSearch, userStations, onRemoveSong, isEdit }) {

    return (
        <>
            <li>
                <select onChange={(ev) => {
                    onChangePlaylist(ev, item, station._id, isSearch)
                }} className="playlist-select">
                    <option value="none">Pick Playlist</option>
                    {userStations.map((userStation, idx) => (
                        station._id === userStation._id ?
                            <option key={idx} value="same">Current Playlist</option> :
                            <option key={idx} value={idx}>{userStation.name}</option>

                    ))}
                </select>
            </li>
            {isEdit && <li onClick={(ev) => onRemoveSong(ev, song._id)}>Remove Song</li>}
        </>

    )
}