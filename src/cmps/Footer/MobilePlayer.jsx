import { useState } from "react";
import { PlayCard } from "../main/PlayCard";
import { PlayerPlayingCard } from "./PLayerPlayingCard";
import { PlayerRightside } from "./PlayerRightside";
import { YouTubeAudioPlayer } from "./YouTubeAudioPlayer";
import { Link } from "react-router-dom";


export function MobilePlayer({ isMobile, volume }) {
    6
    return (
        <section className="mobile-player">
            <Link to={'/mobile/player'}>
                <PlayerPlayingCard />
                <YouTubeAudioPlayer volume={volume}></YouTubeAudioPlayer>
            </Link>
        </section>
    )
}