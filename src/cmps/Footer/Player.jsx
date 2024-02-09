
import { useState } from 'react'
import { PlayerPlayingCard } from './PLayerPlayingCard'
import { YouTubeAudioPlayer } from './YouTubeAudioPlayer'
import { PlayerRightside } from './PlayerRightside'

export function Player() {

    const [volume, setVolume] = useState(50)

    return (
        <div className="app-footer flex">
            <PlayerPlayingCard />
            <YouTubeAudioPlayer volume={volume}  ></YouTubeAudioPlayer>
            <PlayerRightside volume={volume} setVolume={setVolume}  ></PlayerRightside>
        </div>
    )
}



