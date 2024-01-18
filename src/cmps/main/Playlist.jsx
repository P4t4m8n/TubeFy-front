import { Clock } from "../../services/icons.service";
import { SongPreview } from "./SongPreview";



export function Playlist({ onSaveSong, songs, onRemoveSong, isEdit, id, user, onChangePlaylist, isSearch, station }) {

    return (

        <div>
            <ul className="song-list grid clean-list">
                <li className="list-header">
                    <p> #</p>
                    <p>Title</p>
                    <p>Artist</p>
                    <p></p>
                    <p><Clock></Clock></p>
                </li>

            </ul>
            <ul className="song-list grid clean-list">
                {songs.map((song, idx) => (
                    <SongPreview station={station} key={idx} idx={idx} song={song} isEdit={isEdit}
                        onRemoveSong={onRemoveSong} isSearch={isSearch} onChangePlaylist={onChangePlaylist}
                        user={user} id={id} onSaveSong={onSaveSong}>
                    </SongPreview>
                ))}

            </ul>
        </div >
    )
}