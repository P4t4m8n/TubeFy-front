import { useCallback, useEffect, useRef, useState } from "react"
import { stationService } from "../services/station.service"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { loadStation, saveStation } from "../store/actions/station.actions"
import { saveSong, setPlaying } from "../store/actions/song.action"
import { Playlist } from "../cmps/main/Playlist"
import { PlaylistHero } from "../cmps/support/PlaylistHero"
import { updateUser } from "../store/actions/user.actions"
import { PlayCard } from "../cmps/main/PlayCard"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { onDragEnd } from "../services/dnd"
import { useBackgroundFromImage } from "../cmps/CustomHooks/useBackgroundFromImage"
import { uploadService } from "../services/upload.service"
import { utilService } from "../services/util.service"
import { Search } from "@mui/icons-material"
import { apiService } from "../services/api.service"
import { EditSearch } from "../cmps/search/EditSearch"



export function StationEdit() {

    const user = useSelector(storeState => storeState.userMoudle.userObj)

    const [stationToEdit, setStationToEdit] = useState(stationService.getEmptyStation())
    const [searchList, setSearchList] = useState(null)
    const dragObj = useSelector(storeState => storeState.appMoudle.dragObj)



    const isEdit = useRef(true)
    const params = useParams()

    useEffect(() => {
        if (params.stationId && user) {
            onLoadStation(params.stationId)
        }

    }, [params.stationId, user])

    useBackgroundFromImage(stationToEdit ? stationToEdit.imgUrl : null)

    async function onLoadStation(stationId) {
        try {
            const station = await loadStation(stationId)
            setStationToEdit(station)

        }
        catch (err) { console.log(err) }
    }


    async function onUplodImg(ev) {
        const file = ev.target.files[0]
        try {
            const imgUrl = await uploadService.uploadImg(file)


            setStationToEdit(prevStation => {
                const updatedStation = { ...prevStation, imgUrl: imgUrl }
                onSaveStation(updatedStation)
                return updatedStation
            })
        }
        catch (err) {
            console.log('err:', err)
        }

    }

    async function onSaveStation(updatedStation = stationToEdit) {

        try {
            const savedSation = await saveStation(updatedStation)
            const userStations = user.stations
            const idx = userStations.findIndex(stations => stations._id === savedSation._id)
            userStations.splice(idx, 1, savedSation)
            updateUser({ ...user, stations: userStations })

        }
        catch (err) {
            console.log(err)
        }
    }

    async function onAddSong(ev, song) {
        ev.preventDefault()
        setSearchList(() => searchList.filter(listSong => song._id !== listSong._id))
        const songs = stationToEdit.songs
        songs.push(song)
        setStationToEdit(prevStation => ({ ...prevStation, songs: songs }))
        onSaveStation()

    }

    async function onSaveSong(song) {
        try {
            const songs = stationToEdit.songs
            const savedSong = await saveSong(song)
            songs.push(savedSong)
            setStationToEdit(prevStation => ({ ...prevStation, songs: songs }))
            onSaveStation()

        }
        catch (err) { console.log(err) }
    }

    function onRemoveSong(ev, songId) {
        ev.preventDefault()
        ev.stopPropagation()

        stationToEdit.songs = stationToEdit.songs.filter(listSong => songId !== listSong._id)
        setStationToEdit(() => ({ ...stationToEdit }))
        onSaveStation()
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

    function handleChange({ target }) {
        let value = target.value
        console.log("value:", value)
        let field = target.name
        console.log("field:", field)
        if (field === 'search') {
            return
        }
        setStationToEdit(prevStation => ({ ...prevStation, [field]: value }))
    }

    if (!stationToEdit) return <div>...Loading</div>


    const { songs } = stationToEdit

    return (

        <section className="station-page" >
            <PlaylistHero stationToEdit={stationToEdit} handleChange={handleChange} onSaveStation={onSaveStation} onUplodImg={onUplodImg} ></PlaylistHero>

            {songs &&
                <div>
                    <div className="play-and-context flex">
                        <PlayCard item={stationToEdit}></PlayCard>
                    </div>
                    <Playlist station={stationToEdit} onChangePlaylist={onChangePlaylist} user={user} songs={songs} id={stationToEdit._id} onRemoveSong={onRemoveSong} isEdit={isEdit.current} />
                </div>
            }
            <EditSearch onSaveSong={onSaveSong} user={user}></EditSearch>



        </section >
    )
}
