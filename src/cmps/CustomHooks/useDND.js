import { useSelector } from 'react-redux'
import { setDragObj } from '../../store/actions/app.actions'
import { saveStation } from '../../store/actions/station.actions'
import { updateUser } from '../../store/actions/user.actions'
import { showSuccessMsg } from "../../services/event-bus.service"
import { SOCKET_EMIT_PLAYLIST_UPDATED, socketService } from '../../services/socket.service'

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
                socketService.emit(SOCKET_EMIT_PLAYLIST_UPDATED, { newFrom })
                const idx = userStations.findIndex(station => station._id === newFrom._id)
                userStations.splice(idx, 1, newFrom)
                showSuccessMsg({ itemName: dragObj.item.name, txt: ` was removed from ${dragObj.from.name}` })
            }

            let dropSongs = stationDrop.songs
            dropSongs.push(dragObj.item)
            stationDrop.songs = dropSongs
            const savedSation = await saveStation(stationDrop)
            socketService.emit(SOCKET_EMIT_PLAYLIST_UPDATED, savedSation)
            const idx = userStations.findIndex(stations => stations._id === savedSation._id)
            userStations.splice(idx, 1, savedSation)
            updateUser({ ...user, stations: userStations })
            setDragObj({})
            showSuccessMsg({ itemName: dragObj.item.name, txt: ` was moved too ${stationDrop.name}` })

        } catch (err) {
            showSuccessMsg(`Unable to move`)
            console.log(err)
        }
    }


    return { handleDragStart, handleDragOver, handleDrop }
}
