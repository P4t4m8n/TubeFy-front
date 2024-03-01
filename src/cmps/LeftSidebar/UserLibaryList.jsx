import { UserLibaryPreivew } from "./UserLibaryPreview";


export function UserLibaryList({ stations, onRemoveStation, onSendPlaylist, setStationInFoucs, stationInFoucs }) {

    return (
        <ul >
            {
                stations.map((station, idx) => (
                    <UserLibaryPreivew
                        userStations={stations}
                        stationInFoucs={stationInFoucs}
                        station={station}
                        setStationInFoucs={setStationInFoucs}
                        onRemoveStation={onRemoveStation}
                        key={idx}
                        onSendPlaylist={onSendPlaylist}>
                    </UserLibaryPreivew>
                ))}
        </ul>
    )
}