import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { saveStation } from "../../store/actions/station.actions"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { SOCKET_EMIT_USER_DISLIKE_PLAYLIST, SOCKET_EMIT_USER_LIKE_PLAYLIST, socketService } from "../../services/socket.service"
import { updateUser } from "../../store/actions/user.actions"

export function useLike( item ) {

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
            showErrorMsg({ txt: 'No user' })
            return
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
            console.error(err)
        }
    }

    function handlePlaylistLike(user, likedItem, isLiked, setIsLikedCallback) {
        let updatedStations = user.stations
        let favStations = user.favorites
        if (isLiked) {
            updatedStations = updatedStations.filter(station => station._id !== likedItem._id)
            favStations = user.favorites.filter(station => station !== likedItem._id)
            socketService.emit(SOCKET_EMIT_USER_DISLIKE_PLAYLIST, likedItem._id)
            setIsLikedCallback(false)
            showSuccessMsg({ txt: 'Removed from Your Libary' })

        } else {
            updatedStations = [...updatedStations, likedItem]
            favStations.push(likedItem._id)
            socketService.emit(SOCKET_EMIT_USER_LIKE_PLAYLIST, likedItem._id)
            setIsLikedCallback(true)
            showSuccessMsg({ txt: 'Added to Your Libary' })

        }
        return { ...user, stations: updatedStations, favorites: favStations }
    }

    function handleSongLike(user, likedItem, isLiked, setIsLikedCallback) {
        let updatedStations = user.stations
        let favSongs = updatedStations[0].songs

        if (isLiked) {
            favSongs = favSongs.filter(fav => fav._id !== likedItem._id)
            setIsLikedCallback(false)
            showSuccessMsg({
                imgUrl: updatedStations[0].imgUrl,
                txt: 'Removed from Liked Songs',
                itemName: likedItem.name
            })

        } else {
            favSongs.push(likedItem)
            setIsLikedCallback(true)
            showSuccessMsg({
                imgUrl: updatedStations[0].imgUrl,
                txt: 'Added to Liked Songs',
                itemName: likedItem.name
            })
        }
        updatedStations[0].songs = favSongs
        return { ...user, stations: updatedStations }
    }

    return { onLike, isLiked }
}