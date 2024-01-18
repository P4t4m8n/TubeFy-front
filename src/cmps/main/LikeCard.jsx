import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { updateUser } from "../../store/actions/user.actions"
import { Heart } from '../../services/icons.service'
import { FullHeart } from '../../services/icons.service'
import { saveStation } from "../../store/actions/station.actions"
import { saveSong } from "../../store/actions/song.action"
import { showSuccessMsg } from "../../services/event-bus.service"



export function LikeCard({ item }) {

    const [isLiked, setIsLiked] = useState(null)
    const user = useSelector(storeState => storeState.userMoudle.userObj)

    const PLAYLIST = 'playlist'
    const SONG = 'song'

    useEffect(() => {

        let LikeCheck
        if (user) {

            if (item.type === PLAYLIST) LikeCheck = user.stations.some(station => station._id === item._id)
            if (item.type === SONG) {
                LikeCheck = user.stations[0].songs.some(song => song._id === item._id)
            }
        }

        if (LikeCheck) setIsLiked(true)
        else setIsLiked(false)


    }, [item, user])

    async function onLike() {

        let tempItem = item

        if (!user) {
            console.log('No user found')
            return
        }
        if (!item._id)
            try {
                tempItem = await saveSong(tempItem)
            }
            catch (err) {
                console.error('Error updating user:', err)
            }

        let userToUpdate

        if (tempItem.type === PLAYLIST) {
            userToUpdate = handlePlaylistLike(user, tempItem, isLiked, setIsLiked)
        } else if (tempItem.type === SONG) {
            userToUpdate = handleSongLike(user, tempItem, isLiked, setIsLiked)
        }

        try {
            if (tempItem.type === SONG) saveStation(userToUpdate.stations[0])
            await updateUser(userToUpdate)
        } catch (err) {
            console.error('Error updating user:', err)
        }
    }

    function handlePlaylistLike(user, likedItem, isLiked, setIsLikedCallback) {
        let updatedStations = user.stations
        if (isLiked) {
            updatedStations = updatedStations.filter(station => station._id !== likedItem._id)
            setIsLikedCallback(false)
            showSuccessMsg(`Playlist Unliked`)

        } else {
            updatedStations = [...updatedStations, likedItem]
            setIsLikedCallback(true)
            showSuccessMsg(`Playlist Liked`)

        }
        return { ...user, stations: updatedStations }
    }

    function handleSongLike(user, likedItem, isLiked, setIsLikedCallback) {
        let updatedStations = user.stations
        let favSongs = updatedStations[0].songs

        if (isLiked) {
            favSongs = favSongs.filter(fav => fav._id !== likedItem._id)
            setIsLikedCallback(false)
            showSuccessMsg(`Song Unliked`)

        } else {
            favSongs.push(likedItem)
            setIsLikedCallback(true)
            showSuccessMsg(`Song Liked`)

        }

        updatedStations[0].songs = favSongs
        return { ...user, stations: updatedStations }
    }
    // console.log('render like')
    return (
        <button className={"like animate__animated " + (isLiked ? 'fill empty animate__heartBeat' : 'fill animate__shakeX')} onClick={onLike}>
            {isLiked ? <FullHeart /> : <Heart />}
        </button>

    )
}