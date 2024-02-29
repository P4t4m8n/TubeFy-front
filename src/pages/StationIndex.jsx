import { useSelector } from "react-redux"
import { useEffect, useRef } from "react"
import { StationList } from "../cmps/main/StationList"
import { stationService } from "../services/station.service"
import { loadStations } from "../store/actions/station.actions"
import { useBackgroundFromImage } from "../cmps/CustomHooks/useBackgroundFromImage"
import { PlayCard } from "../cmps/main/PlayCard"
import { Loading } from "../cmps/support/Loading"

export function StationIndex() {

    const stations = useSelector(storeState => storeState.stationsMoudle.stations)
    const stationListTitle = useRef([])

    useEffect(() => {
        loadStations()
        stationListTitle.current = stationService.getStationListTitle()
    }, [])

    useBackgroundFromImage('')

    if (!stations || !stations.length) return <Loading></Loading>

    const heroStations = stations.slice(0, 6)
    return (

        <div className="home-page">

            <>
                <h1>Good evening</h1>
                <ul className="main-hero" >
                    <li>
                        <div className="content">
                            <img src={heroStations[0].imgUrl}></img>
                            <p>{heroStations[0].name}</p>
                        </div>
                        <PlayCard item={heroStations[0]}></PlayCard>
                    </li>
                    <li>
                        <div className="content">
                            <img src={heroStations[1].imgUrl}></img>
                            <p>{heroStations[1].name}</p>
                        </div>
                        <PlayCard item={heroStations[1]}></PlayCard>
                    </li>
                    <li>
                        <div className="content">
                            <img src={heroStations[2].imgUrl}></img>
                            <p>{heroStations[2].name}</p>
                        </div>
                        <PlayCard item={heroStations[2]}></PlayCard>
                    </li>
                    <li>
                        <div className="content">
                            <img src={heroStations[3].imgUrl}></img>
                            <p>{heroStations[3].name}</p>
                        </div>
                        <PlayCard item={heroStations[3]}></PlayCard>
                    </li>
                    <li>
                        <div className="content">
                            <img src={heroStations[4].imgUrl}></img>
                            <p>{heroStations[4].name}</p>
                        </div>
                        <PlayCard item={heroStations[4]}></PlayCard>
                    </li>
                    <li>
                        <div className="content">
                            <img src={heroStations[5].imgUrl}></img>
                            <p>{heroStations[5].name}</p>
                        </div>
                        <PlayCard item={heroStations[5]}></PlayCard>
                    </li>

                </ul>
            </>

            {
                stationListTitle.current.map((stationListTitle, idx) => {
                    {

                        const stationsFilterd = stations.filter(station => station.stationListTitle === stationListTitle)
                        return <StationList key={idx} stations={stationsFilterd} stationListTitle={stationListTitle}  ></StationList>
                    }
                })
            }

        </div>

    )

}
