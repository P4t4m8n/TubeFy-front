import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { saveStation } from "../../store/actions/station.actions"
import { stationService } from "../../services/station.service"
import { updateUser } from "../../store/actions/user.actions"
import { SOCKET_EMIT_SEND_PLAYLIST, SOCKET_EMIT_USER_DISLIKE_PLAYLIST, socketService } from "../../services/socket.service"
import { Loading } from "../Loading"
import { NoUserCmp } from '../NoUserCmp'
import { UserLibaryFilter } from './UserLibaryFilter'
import { CreateStation } from './CreateStationCmp'
import { UserLibaryList } from './UserLibaryList'

export function UserLibaryIndex() {

    const user = useSelector((storeState) => storeState.userMoudle.userObj)

    const [filterSort, setFilterSort] = useState({ name: '', sortBy: '' })
    const [userStations, setUserStations] = useState(null)
    const [open, setOpen] = useState(false)
    const [stationInFoucs, setStationInFoucs] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        if (user) setUserStations(user.stations)
    }, [user])


    async function createStation() {
        let newStation = stationService
            .getEmptyStation('My station #', userStations.length - 1, '', { _id: user._id, username: user.username, })

        try {
            newStation = await saveStation(newStation)
            const newUserStations = userStations
            newUserStations.push(newStation)
            const editUser = { ...user, stations: newUserStations }
            await updateUser(editUser)
            navigate('/station/edit/' + newStation._id)
        }
        catch (err) { console.log(err) }

    }

    async function onRemoveStation(ev, stationId) {

        ev.preventDefault()
        const newStations = user.stations.filter(station => station._id !== stationId)
        try {
            const editUser = { ...user, stations: newStations }
            await updateUser(editUser)
            socketService.emit(SOCKET_EMIT_USER_DISLIKE_PLAYLIST, stationId)
            navigate('/')
        }
        catch (err) { console.log(editUser.stations) }
    }

    function handleChange({ target }) {
        setFilterSort(prev => ({ ...prev, name: target.value }))
        FilterList()
        if (!target.value) setUserStations([...user.stations])
    }

    function FilterList() {
        const regex = new RegExp(filterSort.name, 'i')
        let newList = user.stations.filter(station => regex.test(station.name))
        if (filterSort.sortBy === 'name') newList.sort((stationA, stationB) => stationA.name.localeCompare(stationB.name))
        else if (filterSort.sortBy === 'createAt') newList.sort((stationA, stationB) => stationA.createdAt - stationB.createdAt)
        setUserStations(newList)

    }

    const onSendPlaylist = (ev, stationId, userId) => {
        ev.preventDefault()
        const data = { data: { stationId, itemName: user.username }, userId }
        socketService.emit(SOCKET_EMIT_SEND_PLAYLIST, data)
    }

    if (!user) return <NoUserCmp open={open} setOpen={setOpen} />

    if (!userStations) return <Loading></Loading>

    return (

        <div className="side-bar-content" >
            <CreateStation createStation={createStation} />
            <UserLibaryFilter handleChange={handleChange} filterSort={filterSort} setFilterSort={setFilterSort} />
            <UserLibaryList
                stations={userStations}
                onRemoveStation={onRemoveStation}
                onSendPlaylist={onSendPlaylist}
                stationInFoucs={stationInFoucs}
                setStationInFoucs={setStationInFoucs} />
        </div >
    )
}


