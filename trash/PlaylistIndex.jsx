// import { useSelector } from "react-redux"
// import { useEffect, useRef } from "react"
// import { loadPlaylist, loadPlaylists } from "../store/actions/playlist.actions"
// import { StationList } from "../cmps/main/StationList"
// import { playListService } from "../services/playlist.service"
// import { setPlaying } from "../store/actions/song.action"
// // import { AppHeader } from "../cmps/Header/AppHeader"

// export function PlaylistIndex() {

//     const playlists = useSelector(storeState => storeState.playlistsMoudle.playlists)
//     const currplaylist = useSelector(storeState => storeState.playlistsMoudle.currPlaylist)
//     const isPlaying = useSelector(storeState => storeState.songMoudle.isPlaying)

//     const topics = useRef([])


//     useEffect(() => {
//         loadPlaylists()
//         topics.current = playListService.getSubHeading()
//     }, [])

//     async function onPlayPlaylist(ev, playlistId) {
//         ev.preventDefault()
//         let playlist
//         try {
//             if (playlistId !== currplaylist._id) playlist = await loadPlaylist(playlistId)
//             setPlaying()
//         }
//         catch (err) { }

//     }


//     if (!playlists) return <div>...Loading</div>
//     console.log('Render playlistIndex')

//     return (
//         <div>
//             {
//                 topics.current.map((subHeading, idx) => {
//                     {
//                         const playlistsFilterd = playlists.filter(playlist => playlist.subHeading === subHeading)
//                         return <StationList isPlaying={isPlaying} currPlaylistId={currplaylist._id} key={idx} idx={idx} playlists={playlistsFilterd} topic={subHeading} onPlayPlaylist={onPlayPlaylist} ></StationList>
//                     }
//                 })
//             }
//         </div>

//     )

// }

