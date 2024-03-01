import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { loadStation } from "../store/actions/station.actions"
import { Playlist } from "../cmps/Playlist"
import { LikeCard } from "../cmps/LikeCard"
import { PlayCard } from "../cmps/PlayCard"
import { useBackgroundFromImage } from "../cmps/CustomHooks/useBackgroundFromImage"
import { Loading } from "../cmps/Loading"
import { showErrorMsg, } from "../services/event-bus.service"
import { useStationEdit } from "../cmps/CustomHooks/useStationEdit"
import { useParams } from "react-router-dom"

export function StationDetails() {

    const user = useSelector(storeState => storeState.userMoudle.userObj)
    const [currStation, setCurrStation] = useState(null)
    const params = useParams()

    const { onChangePlaylist } = useStationEdit()

    useEffect(() => {
        console.log(params)      
        if (params.stationId) onLoadstation()
    }, [params.stationsId, user])

    useBackgroundFromImage(currStation ? currStation.imgUrl : null)

    async function onLoadstation() {
  try {
            const station = await loadStation(params.stationId)
            setCurrStation(station)
        } catch (err) { showErrorMsg({ txt: `Unbale to load` }) }
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
                        <p>{amount} <span>songs</span></p>
                        <p><span>Duration</span> {duration}</p>
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






