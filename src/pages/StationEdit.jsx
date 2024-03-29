import { useRef } from "react"
import { Playlist } from "../cmps/Playlist"
import {  PlaylistEditHero } from "../cmps/StationEdit/PlaylistEditHero"
import { PlayCard } from "../cmps/PlayCard"
import { useBackgroundFromImage } from "../cmps/CustomHooks/useBackgroundFromImage"
import { EditSearch } from "../cmps/StationEdit/EditSearch"
import { Loading } from "../cmps/Loading"
import { useStationEdit } from "../cmps/CustomHooks/useStationEdit"

export function StationEdit() {

    const
        {
            user,
            stationToEdit,
            setStationToEdit,
            onSaveStation,
            onChangePlaylist,
            onSaveSong,
            onRemoveSong,
            onUploadImg
        }
            = useStationEdit()

    useBackgroundFromImage(stationToEdit ? stationToEdit.imgUrl : null)

    const isEdit = useRef(true)

    function handleChange({ target }) {
        let value = target.value
        let field = target.name
        if (field === 'search') {
            return
        }
        setStationToEdit(prevStation => ({ ...prevStation, [field]: value }))
    }

    if (!stationToEdit) return <Loading></Loading>

    const { songs } = stationToEdit

    return (

        <section className="station-page" >
            <PlaylistEditHero
                stationToEdit={stationToEdit}
                handleChange={handleChange}
                onSaveStation={onSaveStation}
                onUploadImg={onUploadImg}
            ></PlaylistEditHero>
            {(songs && (songs.length > 0)) &&
                <div>
                    <div className="play-and-context flex">
                        <PlayCard item={stationToEdit}></PlayCard>
                    </div>
                    <Playlist station={stationToEdit}
                        onChangePlaylist={onChangePlaylist}
                        user={user} songs={songs}
                        onRemoveSong={onRemoveSong}
                        isEdit={isEdit.current} />
                </div>
            }
            <EditSearch onChangePlaylist={onChangePlaylist}
                onSaveSong={onSaveSong} user={user}></EditSearch>
        </section >
    )
}
