import { PlayCard } from "../main/PlayCard";
import { PlayerPlayingCard } from "./PLayerPlayingCard";
import { PlayerRightside } from "./PlayerRightside";
import { YouTubeAudioPlayer } from "./YouTubeAudioPlayer";


export function MobilePlayer({ volume }) {
    console.log("volume:", volume)



    return (
        <section className="mobile-player">
            <PlayerPlayingCard />
            <YouTubeAudioPlayer volume={volume}></YouTubeAudioPlayer>
        </section>
    )
}