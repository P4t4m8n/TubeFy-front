import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { loadStation } from "../store/actions/station.actions"
import { Playlist } from "../cmps/main/Playlist"
import { LikeCard } from "../cmps/main/LikeCard"
import { PlayCard } from "../cmps/main/PlayCard"
import { useBackgroundFromImage } from "../cmps/CustomHooks/useBackgroundFromImage"
import { useDeviceCheck } from "../cmps/CustomHooks/UseDeviceCheck"
import { Loading } from "../cmps/support/Loading"
import { useSelector } from "react-redux"

export function StationDetails() {

    const user = useSelector(storeState => storeState.userMoudle.userObj)
    const [currStation, setCurrStation] = useState(null)
    const params = useParams()

    useEffect(() => {
        if (params.stationId) onLoadstation()
    }, [params.stationsId, user])

    useBackgroundFromImage(currStation ? currStation.imgUrl : null)

    async function onLoadstation() {
        const station = await loadStation(params.stationId)
        setCurrStation(station)
    }

    function onChangePlaylist(ev, song, stationId, isSearch) {
        ev.preventDefault()
        if (ev.target.value === 'same') return
        if (isSearch) onAddSong(ev, song)
        onRemoveSong(ev, song._id)

        const newPlay = user.stations[ev.target.value]
        newPlay.songs.push(song)
        saveStation(newPlay)
    }

    if (!currStation) return <Loading />
    const { imgUrl, type, createdBy, name, duration, songs, description } = currStation
    const amount = currStation.songs.length

    return (
        <section className="station-details" >
            <header className="station-header" >
                <img src={imgUrl}></img>
                <div className="station-header-info">
                    <h2>{type === 'playlist' ? 'Playlist' : 'Song'}</h2>
                    <h3>{name}</h3>
                    <h4>{description}</h4>
                    <div >
                        <img src="https://res.cloudinary.com/dpnevk8db/image/upload/v1705844322/zvo0mhdh6lyqgvpavfob.png"></img>
                        <p>{createdBy.username || 'Spotify'}</p>
                        <p>{amount} songs</p>
                        <p>about {duration}</p>
                    </div>
                </div>
            </header>

            <section className="station-details-control">
                <div className="station-details-control-left">
                    <PlayCard item={currStation}></PlayCard>
                    <LikeCard item={currStation}></LikeCard>

                </div>

            </section>
            <Playlist station={currStation} onChangePlaylist={onChangePlaylist} user={user} songs={songs}></Playlist>
        </section >
    )

}






