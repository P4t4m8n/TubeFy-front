import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { loadStation } from "../store/actions/station.actions"
import { Playlist } from "../cmps/main/Playlist"
import { LikeCard } from "../cmps/main/LikeCard"
import { PlayCard } from "../cmps/main/PlayCard"
import { useBackgroundFromImage } from "../cmps/CustomHooks/useBackgroundFromImage"
import { useDeviceCheck } from "../cmps/CustomHooks/UseDeviceCheck"
import { Loading } from "../cmps/support/Loading"



export function StationDetails() {

    const [currStation, setCurrStation] = useState(null)
    const params = useParams()

    useEffect(() => {
        onLoadstation()
    }, [params.stationsId])

    useBackgroundFromImage(currStation ? currStation.imgUrl : null)
    useDeviceCheck()

    async function onLoadstation() {
        const station = await loadStation(params.stationId)
        setCurrStation(station)
    }

    if (!currStation) return <Loading />
    const { imgUrl, type, createdBy, name, duration, songs, description } = currStation
    const amount = currStation.songs.length

    console.log('Render station-details')
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
            <Playlist songs={songs}></Playlist>
        </section >
    )

}






