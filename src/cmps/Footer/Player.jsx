
import { useState } from 'react'
import { PlayerPlayingCard } from './PLayerPlayingCard'
import { YouTubeAudioPlayer } from './YouTubeAudioPlayer'
import { PlayerRightside } from './PlayerRightside'
import { MOBILE, PC, TABLET, useDeviceCheck } from '../CustomHooks/UseDeviceCheck'
import { useSelector } from 'react-redux'
import { MobilePlayer } from './MobilePlayer'
import { TabletPlayer } from './TabletPlayer'

export function Player() {

    const [volume, setVolume] = useState(50)
    const device = useSelector(storeState => storeState.appMoudle.device)

    useDeviceCheck()

    return (
        <DynmicPlayerCmp device={device} volume={volume} setVolume={setVolume} ></DynmicPlayerCmp>
    )
}


function DynmicPlayerCmp(props) {
    switch (props.device) {
        case MOBILE:
            return <MobilePlayer {...props} />
        case TABLET:
            return <TabletPlayer {...props} />

        default:
            return (
                <div className="app-footer flex">
                    <PlayerPlayingCard />
                    <YouTubeAudioPlayer {...props}  ></YouTubeAudioPlayer>
                    <PlayerRightside {...props}  ></PlayerRightside>
                </div>
            )

    }
}

