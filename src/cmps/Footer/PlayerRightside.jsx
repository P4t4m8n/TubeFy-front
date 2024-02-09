import { useSelector } from "react-redux"
import { FullScreen, Volume } from "../../services/icons.service"

export function PlayerRightside({ volume, setVolume }) {

    const player = useSelector(storeState => storeState.playerMoudle.player)

    function handleVolumeChange(ev) {
        const newVolume = parseInt(ev.target.value, 10)
        setVolume(newVolume)
        if (player) {
            player.setVolume(newVolume)
        }
    }

    function onSetVolume(ev) {
        let vol = 100
        if (volume > 0) vol = 0
        setVolume(vol)
        if (player) {
            player.setVolume(vol)
        }
    }

    function toggleFullScreen(ev) {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()

        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            }
        }
    }

    return (
        <section className="rightside-footer">
            <button onClick={onSetVolume}><Volume></Volume></button>
            <div className="volume">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                ></input>
            </div>
            <button onClick={toggleFullScreen}><FullScreen></FullScreen></button>
        </section>
    )
}
