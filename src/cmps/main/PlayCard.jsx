import { useSelector } from "react-redux"
import { loadSong, setPlaying } from "../../store/actions/song.action"
import { setCurrStation } from "../../store/actions/station.actions"
import { Pause, Play } from "../../services/icons.service"


export function PlayCard({ item }) {

    const isPlaying = useSelector(storeState => storeState.songMoudle.isPlaying)
    const song = useSelector(storeState => storeState.songMoudle.currSong)
    const station = useSelector(storeState => storeState.stationsMoudle.currStation)
    const player = useSelector(storeState => storeState.playerMoudle.player)

    let cardType = (item.type === 'playlist') ? station._id : song.trackId


    function onPlayStation(ev) {
        console.log("ev:", ev)
        // ev.stopPropagation()
        ev.preventDefault()

        if (item.type === 'playlist') {
            if ((item._id !== cardType) || (song.trackId !== item.trackId)) {
                setCurrStation(item)
                loadSong(item.songs[0])
                // setPlaying(!isPlaying)

            }
        }

        else if (item.type === 'song') {
            if (item.trackId !== cardType) {
                loadSong(item)
                // setPlaying(!isPlaying)

            }
        }

        togglePlayPause()

    }

    function togglePlayPause() {
        if (isPlaying) {
            player.pauseVideo()
        }
        else {
            player.playVideo()

        }
        setPlaying(!isPlaying)
        // onPlayStation()
    }

    let showPlay = ''
    if (isPlaying && (item._id === cardType || item.trackId === cardType)) showPlay = 'show'

    return (
        <button onClick={onPlayStation} className={"play-button " + showPlay}>
            {isPlaying && (item._id === cardType || item.trackId === cardType) ? <Pause /> : <Play />}
        </button>
    )
}