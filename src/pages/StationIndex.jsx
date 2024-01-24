import { useSelector } from "react-redux"
import { Fragment, useEffect, useRef } from "react"
import { StationList } from "../cmps/main/StationList"
import { stationService } from "../services/station.service"
import { loadStations } from "../store/actions/station.actions"
import { useBackgroundFromImage } from "../cmps/CustomHooks/useBackgroundFromImage"
import { PC, useDeviceCheck } from "../cmps/CustomHooks/UseDeviceCheck"
import { PlayCard } from "../cmps/main/PlayCard"

export function StationIndex() {

    const stations = useSelector(storeState => storeState.stationsMoudle.stations)
    const device = useSelector(storeState => storeState.appMoudle.device)

    const stationListTitle = useRef([])

    useEffect(() => {
        loadStations()
        stationListTitle.current = stationService.getStationListTitle()
    }, [])

    useBackgroundFromImage('')
    useDeviceCheck()
    

    if (!stations || !stations.length) return <div>...Loading</div>

    const heroStations = stations.slice(0,6)
    return (
        <Fragment >
            <div className="home-page">
                {(device === PC) &&
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
                }
                {
                    stationListTitle.current.map((stationListTitle, idx) => {
                        {

                            const stationsFilterd = stations.filter(station => station.stationListTitle === stationListTitle)
                            return <StationList key={idx} stations={stationsFilterd} stationListTitle={stationListTitle}  ></StationList>
                        }
                    })
                }

            </div>
        </Fragment>
    )

}
