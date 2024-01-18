import { asyncService } from "../src/services/async-storage.service"
import { songService } from "../src/services/song.service"
import { utilService } from "../src/services/util.service"

const STORGE_STATION_KEY = 'station_DB'

_createStations()

export const stationServiceOld = {
    query,
    get,
    save,
    remove,
    getStationListTitle,
    getDefaultStation,
    createStation,
    getUserEpisodes,
    getEmptyStation,
    getStationDuration,
}

async function query(filterSortBy = {}) {
    try {
        const stations = await asyncService.query(STORGE_STATION_KEY)
        return stations
    }
    catch (err) {
        throw err
    }

}

async function get(stationId) {
    const station = await asyncService.get(STORGE_STATION_KEY, stationId)
    station.duration = getStationDuration(station.songs)

    return station

}

async function save(station) {
    try {

        if (station._id) return await asyncService.put(STORGE_STATION_KEY, station)
        return await asyncService.post(STORGE_STATION_KEY, station)
    }
    catch (err) {
        throw err
    }
}

function remove(stationId) {

    return asyncService.remove(stationId)
}

function getStationListTitle() {
    return ['Made for you', 'Top charts', 'Jump back on', 'Recently played', 'Your top mixes']
}

function getDefaultStation() {

    let station = {
        "_id": utilService.makeId(),
        "name": utilService.makeLorem(2),
        "subHeading": 'Welcome to Stainfy',
        "type": "playlist",
        "tags": ["deafult"],
        "stationImgUrl": 'https://i.scdn.co/image/ab67706f0000000374be24e6ba30b6497b60fca5',
        "createdBy": {
            "_id": utilService.makeId(),
            "username": utilService.makeLorem(1),
            "profileImg": ""
        },
        "likedByUsers": ['', '']
    }

    let songs = []
    for (var i = 0; i < 15; i++) {
        let song = songService.getRandomSong()
        songs.push(song)
    }
    station.songs = songs
    return station
}

function getUserEpisodes() {
    return { songs: [{ artist: '' }, { artist: '' }, { artist: '' }] }
}

function getStationDuration(items) {
    let totalMinutes = 0

    items.forEach(item => {
        const [hours, minutes] = item.duration.split(':')
        totalMinutes += parseInt(hours, 10) * 60 + parseInt(minutes, 10)
    })

    const totalHours = Math.floor(totalMinutes / 60)
    const remainingMinutes = totalMinutes % 60

    const formattedTotalRunTime = `${String(totalHours).padStart(2, '0')}:
    ${String(remainingMinutes).padStart(2, '0')}`

    return formattedTotalRunTime
}

function _createStations() {

    const stationListTitle = ['Made for you', 'Top charts', 'Jump back on', 'Recently played', 'Your top mixes',]
    const descriptions = ['Discover new music based on your preference...', 'Rock out while you play', 'With The Rise against, AFI, The unseen and more']

    let stations = utilService.loadFromStorage(STORGE_STATION_KEY)

    if (!stations || !stations.length) {

        stations = []
        let songsIdx = 0
        let songsArr = songService.getSongs()

        for (var k = 0; k < 30; k++) {
            let station = {
                "_id": utilService.makeId(),
                "name": 'All new music',
                stationListTitle: stationListTitle[k % 5],
                description: descriptions[k % 3],
                "type": "playlist",
                "tags": ["Soul", "Chill"],
                imgUrl: 'https://i.scdn.co/image/ab67706f0000000374be24e6ba30b6497b60fca5',
                "createdBy": {
                    "_id": utilService.makeId(),
                    "username": utilService.makeLorem(1),
                    "profileImg": ""
                },
                "likedByUsers": ['', '']
            }

            let songs = []
            for (var i = songsIdx; i < songsIdx + 15; i++) {
                songs.push(songsArr[i])
            }
            songsIdx += 15
            if (songsIdx > 200) songsIdx = 0
            station.songs = songs
            stations.push(station)
        }
        utilService.saveToStorage(STORGE_STATION_KEY, stations)
    }

    return stations

}

function getEmptyStation(name = '', idx = '',imgUrl='') {
    return {
    
        name: name + idx,
        stationListTitle: '',
        type: "playlist",
        tags: [],
        imgUrl: imgUrl,
        createdBy: {
            _id: '',
            username: '',
        },
        likedByUsers: 0,
        songs: []
    }
}

function createStation(songs, name = 'My station #', subHeading = '1', idx = '') {
    return {

        "name": name + idx,
        "subHeading": subHeading,
        "type": "station",
        "tags": [''],
        "imgUrl": 'src/assets/img/note.svg',
        "createdBy": {
            "_id": subHeading,
            "username": '',
            "profileImg": ''
        },
        "likedByUsers": [''],
        songs: [...songs]
    }
}
