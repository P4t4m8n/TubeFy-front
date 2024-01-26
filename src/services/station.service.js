import { httpService } from "./http.service"


const BASE_URL = 'station/'

export const stationService = {
  query,
  get,
  save,
  remove,
  getStationListTitle,
  getDefaultStation,
  getEmptyStation,
  convertTimeFormat,
  getStationDuration,
}

function query(filterSortBy = {}) {
  return httpService.get(BASE_URL, filterSortBy)
}

function get(stationId) {
 
  return httpService.get(BASE_URL + stationId)
}

function save(station) {
  const edit = 'edit/'
  station.duration = getStationDuration(station.songs)
  if (station._id) return httpService.put(BASE_URL + edit + station._id, station)
  return httpService.post(BASE_URL + edit, station)
}

function remove(stationId) {
  return httpService.delete(BASE_URL + stationId)
}

function getStationListTitle() {
  return ['Daily Mix', 'Jump back on', 'New music']
}

function getEmptyStation(name = '', idx = '', imgUrl = '', createdBy = { _id: '', username: '', }) {
  return {

    name: name + idx,
    stationListTitle: '',
    type: "playlist",
    tags: [],
    imgUrl: imgUrl,
    createdBy: createdBy,
    likedByUsers: 0,
    songs: [],
    duration: '',
    description: ''
  }
}

function getDefaultStation() {

  return {
    "_id": "65a582381424bff446d6839b",
    "name": "Discover Weekly",
    "stationListTitle": "New music",
    "type": "playlist",
    "tags": [],
    "imgUrl": "http://res.cloudinary.com/dpnevk8db/image/upload/v1705350332/fxslryvz4zqsx7pfkcpj.jpg",
    "createdBy": {
      "_id": "",
      "username": "TubeFy"
    },
    "likedByUsers": 0,
    "songs": [
      {
        "name": "Flowers ",
        "artist": "Miley Cyrus",
        "type": "song",
        "duration": "03:22",
        "trackId": "G7KNmW9a75Y",
        "imgUrl": "https://i.ytimg.com/vi/G7KNmW9a75Y/mqdefault.jpg",
        "addedBy": "artist",
        "addedAt": {
          "$numberLong": "1705346665264"
        },
        "likedByUsers": [],
        "_id": "65a586693bc5d92a271d70bf"
      },
      {
        "name": "Kill Bill ",
        "artist": "SZA",
        "type": "song",
        "duration": "04:36",
        "trackId": "MSRcC626prw",
        "imgUrl": "https://i.ytimg.com/vi/MSRcC626prw/mqdefault.jpg",
        "addedBy": "artist",
        "addedAt": {
          "$numberLong": "1705346688501"
        },
        "likedByUsers": [],
        "_id": "65a586803bc5d92a271d70c0"
      },
      {
        "name": "As It Was ",
        "artist": "Harry Styles",
        "type": "song",
        "duration": "02:46",
        "trackId": "H5v3kku4y6Q",
        "imgUrl": "https://i.ytimg.com/vi/H5v3kku4y6Q/mqdefault.jpg",
        "addedBy": "artist",
        "addedAt": {
          "$numberLong": "1705346701331"
        },
        "likedByUsers": [],
        "_id": "65a5868d3bc5d92a271d70c1"
      },
      {
        "name": "Seven (feat. Latto)",
        "artist": "Jungkook",
        "type": "song",
        "duration": "03:47",
        "trackId": "QU9c0053UAU",
        "imgUrl": "https://i.ytimg.com/vi/QU9c0053UAU/mqdefault.jpg",
        "addedBy": "artist",
        "addedAt": {
          "$numberLong": "1705346723878"
        },
        "likedByUsers": [],
        "_id": "65a586a33bc5d92a271d70c2"
      },
      {
        "name": "Ella Baila Sola",
        "artist": "Eslabon Armado & Peso Pluma",
        "type": "song",
        "duration": "03:08",
        "trackId": "lZiaYpD9ZrI",
        "imgUrl": "https://i.ytimg.com/vi/lZiaYpD9ZrI/mqdefault.jpg",
        "addedBy": "artist",
        "addedAt": {
          "$numberLong": "1705346740420"
        },
        "likedByUsers": [],
        "_id": "65a586b43bc5d92a271d70c3"
      },
      {
        "name": "Cruel Summer",
        "artist": "Taylor Swift",
        "type": "song",
        "duration": "03:00",
        "trackId": "JLJcHbYSlB8",
        "imgUrl": "https://i.ytimg.com/vi/JLJcHbYSlB8/mqdefault.jpg",
        "addedBy": "artist",
        "addedAt": {
          "$numberLong": "1705346774803"
        },
        "likedByUsers": [],
        "_id": "65a586d63bc5d92a271d70c4"
      },
      {
        "name": "Creepin",
        "artist": "The Weeknd",
        "type": "song",
        "duration": "03:41",
        "trackId": "-UcFeTfm1oM",
        "imgUrl": "https://i.ytimg.com/vi/-UcFeTfm1oM/mqdefault.jpg",
        "addedBy": "artist",
        "addedAt": {
          "$numberLong": "1705346790729"
        },
        "likedByUsers": [],
        "_id": "65a586e63bc5d92a271d70c5"
      },
      {
        "name": "BZRP Music Sessions 53",
        "artist": "SHAKIRA",
        "type": "song",
        "duration": "04:40",
        "trackId": "qSSg1EAImm4",
        "imgUrl": "https://i.ytimg.com/vi/qSSg1EAImm4/mqdefault.jpg",
        "addedBy": "artist",
        "addedAt": {
          "$numberLong": "1705346998977"
        },
        "likedByUsers": [],
        "_id": "65a587b63bc5d92a271d70c6"
      },
      {
        "name": "Anti-Hero ",
        "artist": "Taylor Swift",
        "type": "song",
        "duration": "05:10",
        "trackId": "b1kbLwvqugk",
        "imgUrl": "https://i.ytimg.com/vi/b1kbLwvqugk/mqdefault.jpg",
        "addedBy": "artist",
        "addedAt": {
          "$numberLong": "1705347010109"
        },
        "likedByUsers": [],
        "_id": "65a587c23bc5d92a271d70c7"
      }
    ],
    "duration": "00:34:10",
    "description": "Rock out while you game"
  }
}

function getStationDuration(items) {
  console.log("items:", items)
  let totalMinutes = 0

  items.forEach(item => {
    const timeParts = item.duration.split(':').map(part => parseInt(part, 10))

    if (timeParts.length === 2) {
      totalMinutes += timeParts[0]
      totalMinutes += timeParts[1] / 60
    } else if (timeParts.length === 3) {
      totalMinutes += timeParts[0] * 60
      totalMinutes

        += timeParts[1]
      totalMinutes += timeParts[2] / 60
    }
  })
  const totalHours = Math.floor(totalMinutes / 60)
  const remainingMinutes = Math.floor(totalMinutes % 60)
  const remainingSeconds = Math.round((totalMinutes - Math.floor(totalMinutes)) * 60)

  let formattedTotalRunTime = `${String(totalHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`
  if (remainingSeconds > 0) {
    formattedTotalRunTime += `:${String(remainingSeconds).padStart(2, '0')}`
  }

  return formattedTotalRunTime
}

function convertTimeFormat(timeStr) {
  const parts = timeStr.split(':').map(part => parseInt(part, 10))
  let formattedTime = []

  if (parts.length === 2) {
    if (parts[0] > 0) formattedTime.push(`${parts[0]} minutes`)
    if (parts[1] > 0) formattedTime.push(`${parts[1]} seconds`)
  } else if (parts.length === 3) {
    if (parts[0] > 0) formattedTime.push(`${parts[0]} hours`)
    if (parts[1] > 0) formattedTime.push(`${parts[1]} minutes`)
    if (parts[2] > 0) formattedTime.push(`${parts[2]} seconds`)
  } else {
    return 'Invalid format'
  }

  return formattedTime.join(' and ')
}





