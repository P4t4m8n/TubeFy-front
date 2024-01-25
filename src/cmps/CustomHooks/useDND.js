import { useSelector } from 'react-redux'
import { setDragObj } from '../../store/actions/app.actions'
import { saveStation } from '../../store/actions/station.actions'
import { updateUser } from '../../store/actions/user.actions'
import { showSuccessMsg } from "../../services/event-bus.service"

export function useDragAndDrop() {

    const dragObj = useSelector(storeState => storeState.appMoudle.dragObj)
    const user = useSelector((storeState) => storeState.userMoudle.userObj)


    const handleDragStart = (ev, item, station, draggableRef) => {
        const data = { item, from: station }
        setDragObj(data)
    }

    const handleDragOver = (ev) => {
        ev.preventDefault()
    }

    const handleDrop = (ev, stationDrop) => {
        ev.preventDefault()

        const idx = stationDrop.songs.findIndex(song => song.trackId === dragObj.item.trackId)
        if (idx > -1) return
        handleTransfer(stationDrop)

    }

    async function handleTransfer(stationDrop) {
        let userStations = user.stations
        try {
            if (dragObj.from) {
                const newFromSongs = dragObj.from.songs.filter(song => song._id !== dragObj.item._id)
                let newFrom = dragObj.from
                newFrom.songs = newFromSongs
                newFrom = await saveStation(newFrom)
                const idx = userStations.findIndex(station => station._id === newFrom._id)
                userStations.splice(idx, 1, newFrom)
                showSuccessMsg(`Song Saved`)
            }

            let dropSongs = stationDrop.songs
            dropSongs.push(dragObj.item)
            stationDrop.songs = dropSongs
            const savedSation = await saveStation(stationDrop)
            const idx = userStations.findIndex(stations => stations._id === savedSation._id)
            userStations.splice(idx, 1, savedSation)
            updateUser({ ...user, stations: userStations })
            setDragObj({})
            showSuccessMsg(`Song Moved`)

        } catch (err) {
            showSuccessMsg(`Unable to move`)
            console.log(err)
        }
    }


    return { handleDragStart, handleDragOver, handleDrop }
}
