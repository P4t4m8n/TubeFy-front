import { useSelector } from "react-redux"
import { PlayerPlayingCard } from "./PLayerPlayingCard"
import { Player } from "./Player"
import { YouTubeAudioPlayer } from "./YouTubeAudioPlayer"
import { useLocation } from "react-router-dom"


export function MobilePlayerPage({ volume }) {

    const song = useSelector(storeState => storeState.songMoudle.currSong)
    const currStation = useSelector(storeState => storeState.stationsMoudle.currStation)
    const location = useLocation()

    const isMobilePalyerPage = location.pathname.includes('mobile/player')


    return (
        <section className="mobile-player-page">
            {currStation && <p>PLaying from {currStation.name}</p>}
            <PlayerPlayingCard></PlayerPlayingCard>
            <YouTubeAudioPlayer volume={volume}></YouTubeAudioPlayer>
        </section>
    )

}