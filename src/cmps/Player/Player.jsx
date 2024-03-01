
import { useState } from 'react'
import { PlayerPlayingCard } from './PLayerPlayingCard'
import { YouTubeAudioPlayer } from './YouTubeAudioPlayer'
import { PlayerVolumeControl } from './PlayerVolumeControl'

export function Player() {

    const [volume, setVolume] = useState(50)

    return (
        <div className="app-footer flex">
            <PlayerPlayingCard />
            <YouTubeAudioPlayer volume={volume}  ></YouTubeAudioPlayer>
            <PlayerVolumeControl volume={volume} setVolume={setVolume}  ></PlayerVolumeControl>
        </div>
    )
}



