import { Link } from "react-router-dom"
import { utilService } from "../src/services/util.service"


export function PlaylistsListList({ playlists, header }) {
    // console.log("playlists:", playlists)


    return (
        <div>
            {/* <ul className="playlist-list-list"> */}
            <ul className="playlist-list-list" key={utilService.makeId}>
                <span>{header}</span>
                {
                    playlists.playlists.map(playlist => {
                        return <Link to={`/${playlist._id}`} key={playlist._id} >
                            <li>
                                <img src={playlist.playlistImgUrl}></img>
                                <p>{playlist.name}</p>
                                {playlist.songs.slice(0, 3).map(song => song.title).join('')}
                                <button >Play</button>
                            </li>
                        </Link>
                    })
                }
            </ul>
        </div>
    )
}