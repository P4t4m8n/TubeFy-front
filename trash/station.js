// function getDefaultStation() {

//     let station = {
//         "_id": utilService.makeId(),
//         "name": utilService.makeLorem(2),
//         "subHeading": 'Welcome to Stainfy',
//         "type": "playlist",
//         "tags": ["deafult"],
//         "stationImgUrl": 'https://i.scdn.co/image/ab67706f0000000374be24e6ba30b6497b60fca5',
//         "createdBy": {
//             "_id": utilService.makeId(),
//             "username": utilService.makeLorem(1),
//             "profileImg": ""
//         },
//         "likedByUsers": ['', '']
//     }

//     let songs = []
//     for (var i = 0; i < 15; i++) {
//         let song = songService.getRandomSong()
//         songs.push(song)
//     }
//     station.songs = songs
//     return station
// }

// function getUserEpisodes() {
//     return { songs: [{ artist: '' }, { artist: '' }, { artist: '' }] }
// }



// function _createStations() {

//     const stationListTitle = ['Made for you', 'Top charts', 'Jump back on', 'Recently played', 'Your top mixes',]
//     const descriptions = ['Discover new music based on your preference...', 'Rock out while you play', 'With The Rise against, AFI, The unseen and more']

//     let stations = utilService.loadFromStorage(STORGE_STATION_KEY)

//     if (!stations || !stations.length) {

//         stations = []
//         let songsIdx = 0
//         let songsArr = songService.getSongs()

//         for (var k = 0; k < 30; k++) {
//             let station = {
//                 "_id": utilService.makeId(),
//                 "name": 'All new music',
//                 stationListTitle: stationListTitle[k % 5],
//                 description: descriptions[k % 3],
//                 "type": "playlist",
//                 "tags": ["Soul", "Chill"],
//                 imgUrl: 'https://i.scdn.co/image/ab67706f0000000374be24e6ba30b6497b60fca5',
//                 "createdBy": {
//                     "_id": utilService.makeId(),
//                     "username": utilService.makeLorem(1),
//                     "profileImg": ""
//                 },
//                 "likedByUsers": ['', '']
//             }

//             let songs = []
//             for (var i = songsIdx; i < songsIdx + 15; i++) {
//                 songs.push(songsArr[i])
//             }
//             songsIdx += 15
//             if (songsIdx > 200) songsIdx = 0
//             station.songs = songs
//             stations.push(station)
//         }
//         utilService.saveToStorage(STORGE_STATION_KEY, stations)
//     }

//     return stations

// }


