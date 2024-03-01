import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { stationService } from '../../services/station.service'
import { loadStation, saveStation } from '../../store/actions/station.actions'
import { updateUser } from '../../store/actions/user.actions'
import { uploadService } from '../../services/upload.service'
import { showSuccessMsg } from '../../services/event-bus.service'

export function useStationEdit() {

    const user = useSelector(storeState => storeState.userMoudle.userObj)
    const [stationToEdit, setStationToEdit] = useState(stationService.getEmptyStation())

    const params = useParams()

    useEffect(() => {
        if (params.stationId) {
            onLoadStaton()
        }

    }, [params.stationId, user, params])

    const onLoadStaton = async () => {
        try {
            const station = await loadStation(params.stationId)
            setStationToEdit(station)
        } catch (err) {
            console.log(err)
        }
    }

    const onSaveStation = async (updatedStation = stationToEdit) => {
        try {
            const savedSation = await saveStation(updatedStation)
            const userStations = user.stations
            const newStations = userStations.map(station => (station._id === savedSation._id) ? savedSation : station)

            updateUser({ ...user, stations: newStations })

            showSuccessMsg({ itemName: saveStation.name, txt: ' was saved' })
        } catch (err) {
            console.log(err)
        }
    }

    const onAddSong = (ev, song) => {
        ev.preventDefault()

        const songs = stationToEdit.songs
        songs.push(song)

        setStationToEdit(prevStation => ({ ...prevStation, songs: songs }))

        onSaveStation()
    }

    const onSaveSong = async (song) => {
        try {
            const songs = stationToEdit.songs
            songs.push(song)

            setStationToEdit(prevStation => ({ ...prevStation, songs: songs }))

            showSuccessMsg({ itemName: song.name, txt: ' was saved' })

            onSaveStation()
        } catch (err) {
            console.log(err)
        }
    }

    const onRemoveSong = (songId) => {
    console.log("songId:", songId)


        stationToEdit.songs = stationToEdit.songs.filter(listSong => songId !== listSong._id)

        setStationToEdit(() => ({ ...stationToEdit }))

        onSaveStation()

        showSuccessMsg({ txt: 'song was removed' })
    }

    const onChangePlaylist = (value, song, isSearch) => {
        // ev.preventDefault()

        if (value < 0) return

        if (!isSearch) onRemoveSong(song._id)

        const newPlay = user.stations[value]
        newPlay.songs.push(song)

        saveStation(newPlay)
        showSuccessMsg({ txt: `song: ${song.name} now in Playlist${newPlay.name}` })

    }
    const onUploadImg = async (ev) => {
    console.log("ev:", ev)

        const file = ev.target.files[0]

        try {
            const imgUrl = await uploadService.uploadImg(file)

            setStationToEdit(prevStation => {
                const updatedStation = {
                    ...prevStation,
                    imgUrl: imgUrl,
                }

                onSaveStation(updatedStation)

                return updatedStation
            })

        } catch (err) {
            console.log('err:', err)
        }
    }

    return { user, stationToEdit, setStationToEdit, onSaveStation, onChangePlaylist, onAddSong, onSaveSong, onRemoveSong, onUploadImg }
}
