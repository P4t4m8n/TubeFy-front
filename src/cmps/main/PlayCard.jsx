
import { Pause, Play } from "../../services/icons.service"
import { usePlay } from "../CustomHooks/usePlay"

export function PlayCard({ item }) {
    const [onPlayStation, showPlay, isPlaying, cardType] = usePlay(item)

    return (
        <button onClick={onPlayStation} className={`play-button ${showPlay ? 'show' : ''}`}>
            {(isPlaying && (cardType === item._id || cardType === item.trackId)) ? <Pause /> : <Play />}
        </button>
    )
}