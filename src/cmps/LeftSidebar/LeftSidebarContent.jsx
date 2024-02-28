import React from 'react'
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { saveStation } from "../../store/actions/station.actions"
import { stationService } from "../../services/station.service"
import { updateUser } from "../../store/actions/user.actions"
import { Libary, Plus, SearchSvg, Sort } from "../../services/icons.service"
import { Input } from "@mui/joy"
import { SortByModal } from "./SortModal"
import { useDragAndDrop } from "../CustomHooks/useDND"
import { SOCKET_EMIT_SEND_PLAYLIST, SOCKET_EMIT_USER_DISLIKE_PLAYLIST, socketService } from "../../services/socket.service"
import { Loading } from "../support/Loading"
import { SidebarContentPreview } from "./SidebarContentPreview"
import { SignIn } from '../User/SignIn'

export function SideBarContent() {

    const user = useSelector((storeState) => storeState.userMoudle.userObj)

    const [filterSort, setFilterSort] = useState({ name: '', sortBy: '' })
    const [showSearch, setShowSearch] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [stationInFoucs, setStationInFoucs] = useState(null)
    const [userStations, setUserStations] = useState(null)
    const [open, setOpen] = useState(false)


    const { handleDragOver, handleDrop } = useDragAndDrop()

    const navigate = useNavigate()

    useEffect(() => {
        if (user) setUserStations(user.stations)

    }, [user])

    function openModal() { setIsModalOpen(true) }
    function closeModal() { setIsModalOpen(false) }

    async function createStation() {
        let newStation = stationService.getEmptyStation('My station #', userStations.length - 1, '', { _id: user._id, username: user.username, })

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
            // await removeStation(stationId)
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

    if (!user) return (
        <section className='no-user'>
            <button onClick={(() => setOpen(true))}>Start listening</button>
            <SignIn open={open} setOpen={setOpen}></SignIn>
        </section>
    )
    if (!userStations) return <Loading></Loading>

    return (

        <div className="side-bar-content" >
            <section className="creation-and-toggle flex">
                <p className="your-library flex" >
                    <Libary></Libary>
                    <span>Library</span>
                </p>
                <button className="mobile your-library flex" >
                    <Link to={"/mobile/libary"}>
                        <Libary></Libary>
                        <span>Library</span>
                    </Link>
                </button>
                <div className="right-buttons flex animate__animated animate__rubberBand">
                    <button onClick={createStation} className="plus-icon-left animate__animated animate__rubberBand">
                        <Plus></Plus>
                    </button>
                </div>
            </section>

            <section className="side-bar-filtersort">
                <div className="search-sort-view">

                    <div className="search-sort-toggle-buttons flex">
                        <button onClick={() => setShowSearch(!showSearch)} >
                            <SearchSvg></SearchSvg>
                        </button>
                        {showSearch &&
                            <Input
                                color="neutral"
                                type="search"
                                placeholder="Search your library"
                                size="sm"
                                variant="soft"
                                onChange={handleChange}
                                sx={{ backgroundColor: "gray", opacity: "70%", width: '11.75rem', height: "2rem", padding: ".5rem" }}
                            />
                        }
                        <button className="sort" onClick={openModal}>
                            <Sort></Sort>
                            {filterSort.sortBy}
                            {isModalOpen && <SortByModal setFilterSort={setFilterSort} isOpen={isModalOpen} onClose={closeModal} filterSort={filterSort}> </SortByModal>}
                        </button>
                    </div>

                </div>
            </section >

            <ul >
                {
                    userStations.map((station, idx) => (
                        <SidebarContentPreview
                            userStations={userStations}
                            stationInFoucs={stationInFoucs}
                            station={station}
                            setStationInFoucs={setStationInFoucs}
                            handleDrop={handleDrop}
                            onRemoveStation={onRemoveStation}
                            handleDragOver={handleDragOver}
                            key={idx}
                            onSendPlaylist={onSendPlaylist}>
                        </SidebarContentPreview>
                    ))}
            </ul>
        </div >
    )
}


