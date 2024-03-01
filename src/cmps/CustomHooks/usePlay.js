
import { useSelector } from "react-redux"
import { loadSong, setPlaying } from "../../store/actions/song.action"
import { setCurrStation } from "../../store/actions/station.actions"

export function usePlay(item) {

    const isPlaying = useSelector(storeState => storeState.songMoudle.isPlaying)
    const song = useSelector(storeState => storeState.songMoudle.currSong)
    const station = useSelector(storeState => storeState.stationsMoudle.currStation)
    const player = useSelector(storeState => storeState.playerMoudle.player)

    const cardType = item.type === 'playlist' ? station._id : song._id

    const onPlayStation = (ev) => {
        ev.preventDefault()

        if (item.type === 'playlist') {
            if (item._id !== cardType || song._id !== item._id) {
                setCurrStation(item)
                loadSong(item.songs[0])

            }
        } else if (item.type === 'song') {
            if (item._id !== cardType) {
                loadSong(item)
            }
        }

        togglePlayPause()
    }

    const togglePlayPause = () => {
        if (isPlaying) {
            player.pauseVideo()
            setPlaying(false)
        } else {
            player.playVideo()
            setPlaying(true)
        }
    }

    const showPlay = isPlaying && (item._id === cardType || item._id === cardType)

    return [onPlayStation, showPlay, isPlaying, cardType]
}