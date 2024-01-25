import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { updateUser } from "../../store/actions/user.actions"
import { Heart } from '../../services/icons.service'
import { FullHeart } from '../../services/icons.service'
import { saveStation } from "../../store/actions/station.actions"
import { saveSong } from "../../store/actions/song.action"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"



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
            showErrorMsg('No user')
            return
        }
        if (!item._id)
            try {
                tempItem = await saveSong(tempItem)
            }
            catch (err) {
                console.error(err)
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
        if (isLiked) {
            updatedStations = updatedStations.filter(station => station._id !== likedItem._id)
            setIsLikedCallback(false)
            showSuccessMsg({ txt: 'Removed from Your Libary' })

        } else {
            updatedStations = [...updatedStations, likedItem]
            setIsLikedCallback(true)
            showSuccessMsg({ txt: 'Added to Your Libary' })

        }
        return { ...user, stations: updatedStations }
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

    return (
        <button className={"like animate__animated " + (isLiked ? 'fill empty animate__heartBeat' : 'fill animate__shakeX')} onClick={onLike}>
            {isLiked ? <FullHeart /> : <Heart />}
        </button>

    )
}