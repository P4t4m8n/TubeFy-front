import { Link } from "react-router-dom"
import { PlayCard } from "../main/PlayCard"

export function StationList({ stations, stationListTitle }) {

    return (
        <div className="station">
            <h2 className="station-topic">{stationListTitle}</h2>
            <ul className="station-list" >
                {stations.map((station, idx) => (
                    <Link key={station._id} to={`/${station._id}`} className="station-card">
                        <li >
                            <img src={station.imgUrl} alt={station.name} className="station-image" />
                            <div className="station-info">
                                <p className="station-name">{station.name}</p>
                                <p className="station-description">
                                    {station.description}
                                </p>
                            </div>
                            <div>
                                <PlayCard item={station} ></PlayCard>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul >
        </div>
    )
}