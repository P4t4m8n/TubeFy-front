import { httpService } from "./http.service"
import { utilService } from "./util.service"

const BASE_URL = 'song/'

export const songService = {
    query,
    getDefaultSong,
    getSongById,
    save,
    remove,
    getEmptysong,
    getRandomSong,
    getSongs
}



function query(filterSortBy = {}) {

    return httpService.get(BASE_URL, filterSortBy)

}

function getSongById(songId) {
    return httpService.get(BASE_URL + songId)
}


function save(song) {
    const edit = 'edit/'
    if (song._id) return httpService.put(BASE_URL + edit + song._id, song)

    return httpService.post(BASE_URL + edit, song)
}

function remove(songId) {
    return httpService.delete(BASE_URL + songId)
}

function getEmptysong(name = '', artist = '', duration = '', imgUrl = '', addedBy = 'YoutubeFy') {
    return {

        name: name,
        artist: artist,
        type: 'song',
        duration: duration,
        trackId: '',
        imgUrl: imgUrl,
        addedBy: addedBy,
        addedAt: Date.now(),
        likedByUsers: []
    }
}

function getSongs() {
    return utilService.loadFromStorage(STORAGE_SONGS_KEY)
}



function getDefaultSong() {
    return {
        _id: '2',
        name: 'Winamp Intro',
        album: 'Single',
        artist: 'Winamp',
        type: 'song',
        duration: "00:06",
        trackId: 'oQid2jSU7Ww',
        imgUrl: 'http://res.cloudinary.com/dpnevk8db/image/upload/v1705451444/mg5yzhho5xauepryttiw.svg',
        addedBy: 'artist',
        addedAt: (Date.now() + 1) - Date.now(),
        likedBy: []
    }
}

function getRandomSong() {


    const tracksId = ['pM6RAz9BE2A', 'zlM0vahvauU', 'npjF032TDDQ', 'eU8P0Ufwpl8']
    return {
        "_id": utilService.makeId(),
        "title": utilService.makeLorem(2),
        "album": utilService.makeLorem(2),
        "artist": utilService.makeLorem(1),
        "type": "song",
        "duration": "02:30",
        "trackId": tracksId[utilService.getRandomIntInclusive(0, 3)],
        "imgUrl": 'https://i.scdn.co/image/ab67706f0000000374be24e6ba30b6497b60fca5',
        "addedBy": 'artist',
        "addedAt": Date.now(),
        "likedBy": [((utilService.getRandomIntInclusive() > 0.5) ? "1" : "")]
    }
}

