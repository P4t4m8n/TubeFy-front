
import { showSuccessMsg } from "../../services/event-bus.service"
import { stationService } from "../../services/station.service"
import { ADD_STATION, EDIT_STATION, SET_CURR_STATION, SET_STATIONS, SET_USER_STATIONS } from "../redcuers/station.reducer"
import { store } from "../store"

export async function loadStations(filterSortBy = {}) {
    try {
        const stations = await stationService.query(filterSortBy)
        store.dispatch({ type: SET_STATIONS, stations })
    }
    catch (err) {
        console.log('Station Action -> Cannot load stations', err)
        throw err
    }
}

export function setCurrStation(station) {
    store.dispatch({ type: SET_CURR_STATION, station })
}

export async function setUserStations(stations) {

    const fav = [stations[0], stations[1]]
    let promisesSongs = stations.splice(0, 2)

    try {
        promisesSongs = stations.map(async station => {
            return await stationService.get(station._id)
        })
    }
    catch (err) {
        console.log('Station Action -> Cannot load user stations', err)
        throw err
    }

    const updatedStations = await Promise.all(promisesSongs)
    const newStations = [...fav, ...updatedStations]

    store.dispatch({ type: SET_USER_STATIONS, newStations })
    return newStations
}

export async function loadStation(stationId) {
    try {
        const station = await stationService.get(stationId)
        store.dispatch({ type: SET_CURR_STATION, station })
        return station
    }
    catch (err) {
        console.log('station Action -> Cannot load station', err)
        throw err
    }
}

export async function removeStation(stationId) {

    try {
        stationService.remove(stationId)
        showSuccessMsg({ txt: stationId + 'was removed' })
    }
    catch (err) {
        console.log('station Action -> Cannot remove station', err)
        throw err
    }
}

export async function saveStation(station) {

    const type = (station._id) ? EDIT_STATION : ADD_STATION

    try {
        const savedStation = await stationService.save(station)
        store.dispatch({ type: type, station: savedStation })
        return savedStation
    }
    catch (err) {
        console.log('Station Action -> Cannot save station', err)
        throw err
    }
}