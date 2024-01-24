import { useSelector } from "react-redux"
import { PlayerPlayingCard } from "./PLayerPlayingCard"
import { Player } from "./Player"
import { YouTubeAudioPlayer } from "./YouTubeAudioPlayer"
import { useLocation } from "react-router-dom"
import { useBackgroundFromImage } from "../CustomHooks/useBackgroundFromImage"


export function MobilePlayerPage({ volume }) {

    const song = useSelector(storeState => storeState.songMoudle.currSong)
    const currStation = useSelector(storeState => storeState.stationsMoudle.currStation)
    const location = useLocation()
    useBackgroundFromImage(song.imgUrl)
    const isMobilePlayerPage = location.pathname.includes('mobile/player')


    return (
        <>
            <section className="mobile-player-page">
                <img src={song.imgUrl}></img>
                <section className="details">
                    <h2>{song.name}</h2>
                    <h3>{song.artist}</h3>
                </section>

            </section>
            <YouTubeAudioPlayer volume={volume}></YouTubeAudioPlayer>
        </>
    )

}