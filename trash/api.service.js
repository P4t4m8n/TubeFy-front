// import axios from "axios"
// // import { jwtDecode } from 'jwt-decode'

// // const CLIENT_ID = '5a37d9f51dbf40c8a317e065f0993a47'
// // const CLIENT_SERCRET = '88c5089152e04a7aa4cdaf5127898e0f'
// // const REDIRECT_URI = 'http://localhost:3000/callback'
// // const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
// // const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
// let accessToken = 'BQC7JQZtWOWdGHwUhUnpllDEdkmN5Tz_OwHijQAuIPFnjmdLY7QlI3UBNwkw4ODEJgSHujeSQGjnOOcUV3xzKONXCfTPzG2xE50LFKoR_F-xvzdINEeReePk1-3VUkVp43kdNC9pruwICRJkZiaKE7ONOFMVE_nIEb0NrTSYU6Qrhklj3OWzFhZzrmM1OedH6ERDorwMkfR9l-NMV9w'

// export const apiService = {
//     getPlaylists,
// }

// // const BASE_URL = 'https://api.spotify.com/v1/'

// let t = 'https://api.spotify.com/v1/playlists/37i9dQZF1DWT9L7hoCDtjB/tracks'

// // // import { fetch } from 'node-fetch'



// // async function playTrack(accessToken, trackUri, device_id = null) {
// //     const endpoint = 'https://api.spotify.com/v1/me/player/play'
// //     const bodyData = {
// //         uris: [trackUri], // Array of Spotify track URIs
// //     }

// //     const response = await axios.put(endpoint, {
    
// //         headers: {
// //             Authorization: `Bearer ${accessToken}`,
// //             ContentType: 'application/json',
// //         },
// //         body: JSON.stringify(bodyData),
// //     })

// //     if (response.ok) {
// //         console.log('Track is playing!')
// //     } else {
// //         console.error('Failed to play track', await response.json())
// //     }
// // }

// // const spotifyToken = 'YOUR_SPOTIFY_OAUTH_TOKEN' // Replace with your OAuth token
// // const trackUri = 'spotify:track:TRACK_ID' // Replace with the Spotify URI of the track you want to play
// // playTrack(spotifyToken, trackUri)



// async function getPlaylists(filterBy = {}) {

//     const country = filterBy.country || 'IL'
//     console.log("country:", country)
//     const local = filterBy.local || 'he_IL'
//     console.log("local:", local)
//     const limit = filterBy.limit || '50'
//     console.log("limit:", limit)
//     const offset = filterBy.offset || '50'
//     console.log("offset:", offset)
//     const url = `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&locale=${local}`

// try {

//     // if (isTokenExpired(accessToken)) {
//     //     accessToken = await _refreshToken()
//     // }

//     const response = await axios.get(url, {
//         headers: {
//             Authorization: `Bearer ${accessToken}`,
//         }
//     })
//     return response.data.playlists.items
//     // return response.data
// }
// catch (err) {
//     console.log("err fetching playlists:", err)
//     throw err
// }
// }




// // const urlArtist = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(search)}&api_key=${API_KEY_LAST_FM}&format=json`
//         // const urlSong = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(search)}&api_key=${API_KEY_LAST_FM}&format=json`

//         // const infoArtist = await axios.get(urlArtist)
//         // const infoSong = await axios.get(urlSong)


// // export const apiService = {
// //     getContent,
// // }

// //  async function getContent(type, search) {
// //     console.log("search:", search)
// //     const destTube = `part = snippet & q=${ search }& type=video`
// //     // const destWiki = `srsearch = ${ search }& format=json`
// //     try{
// //         const responseArtist =  await getArtist(destTube)
// //         const artistChannelId = responseArtist.data
// //         console.log("responseArtist:", responseArtist.data.items[0].snippet.channelId)
      
    
// //         const responsePlaylist = getPlaylist(artistChannelId)
// //     }
// //     catch(err){throw err}

// //     // try {
// //     //     const responseArtist = await axios.get(URL_ARTIST_TUBE + destTube)
// //     //     const responsePlaylist = await axios.get(URL_PLAYLIST_TUBE + destTube)
// //     //     console.log("responseArtist:", responseArtist.data)
// //     //     console.log("responsePLaylist:", responsePlaylist.data)

// //     //     // const itemsObj = response.data.items.map(item => {
    
// //     //     //     // return _makeItemObj(item)
// //     //     // })

// //     // } catch (error) {
// //     //     console.error('Error fetching search results:', error)
// //     // }
// // }

// // async function getArtist(destTube){
// //     try{
// //                 const responseArtist = await axios.get(URL_ARTIST_TUBE + destTube)
// //                 console.log("responseArtist.data:", responseArtist.data)
// //                 getPlaylist
// //                 return responseArtist.data
// //     }
// //     catch(err){console.error('Error fetching search results:', err)}
// // }
    
// // }
// // async function getPlaylist(destTube){
// //     console.log("destTube:", destTube)
// //     try{
// //                 const responsePlaylist = await axios.get(URL_PLAYLIST_TUBE + destTube)
// //                 console.log("responsePlaylist:", responsePlaylist)
// //                 return responsePlaylist.data
// //     }
// //     catch(err){console.error('Erro fetching search results:', err)}
    
// // }

// // async function _makeItemObj(item) {
// // console.log("item:", item)

// //     // const title = item.snippet.title.replace(/[^a-zA-Z0-9]/g, '')
// //     // const regex = /^([^-]+ - [^-]+)/
// //     // const title = item.snippet.title.replace(/\([^)]*\)|\[[^\]]*\]|[^A-Za-z0-9]/g, "")
// //     // const destWiki = `srsearch = ${ title }& format=json`

// //     let title = item.snippet.title
// //     let artist
// //     let song
// //     const check = title.match(/[^A-Za-z0-9]/)

// //     if (check) {
// //         artist = title.substring(0, check.index)
// //         song = title.substring(check.index + 2)
// //     }
  

// //     const urlArtist = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artist)}&api_key=${API_KEY_LAST_FM}&format=json`
// //     // const urlSong = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(song)}&api_key=${API_KEY_LAST_FM}&format=json`

// //     try {
// //         const infoArtist = await axios.get(urlArtist)
// //         const infoSong = await axios.get(urlSong)
// //         console.log("infoArtist:", infoArtist.data.artist)
// //         // console.log("infoSong:", infoSong.data.resultsd)

// //     }
// //     catch (err) { console.log('err', err) }


// // }


//         // const trackId = responseArtist.data.items[0].id.videoId

//         // let title = responseArtist.data.items[0].snippet.title
//         // const regex = /^([^-]+ - [^-]+)/
//     //    const title = item.replace(/[^a-zA-Z0-9]/g, '')
//     //    const name =  item.replace(/\([^)]*\)|\[[^\]]*\]|[^A-Za-z0-9]/g, "")
//     //    console.log("item:", item)
//     //    console.log("title:", title)
//     //     console.log("name:", name)

        
//         // const destWiki = `srsearch = ${ title }& format=json`
        
//     //     let artist
//     //     let song
//     //  check = title.match(/[^A-Za-z0-9]/)


















































// // // function initiateAuthorization() {
// // //     const authUrl = new URL(AUTH_ENDPOINT)
// // //     authUrl.searchParams.append('client_id', CLIENT_ID)
// // //     authUrl.searchParams.append('response_type', 'code')
// // //     authUrl.searchParams.append('redirect_uri', REDIRECT_URI)

// // //     window.location.href = authUrl.toString()
// // // }

// // // async function exchangeCodeForTokens(authorizationCode) {
// // //     const payload = {
// // //         method: 'POST',
// // //         headers: {
// // //             'Content-Type': 'application/x-www-form-urlencoded',
// // //         },
// // //         body: new URLSearchParams({
// // //             grant_type: 'authorization_code',
// // //             code: authorizationCode,
// // //             redirect_uri: REDIRECT_URI,
// // //             client_id: CLIENT_ID,
// // //             client_secret: 'your_client_secret', // Replace with your actual client secret
// // //         }),
// // //     }

// // //     try {
// // //         const response = await fetch(TOKEN_ENDPOINT, payload)
// // //         const tokens = await response.json()
// // //         console.log('Tokens:', tokens)

// // //         const refresh_token = tokens.refresh_token
// // //         return refresh_token
// // //     } catch (error) {
// // //         console.error('Error exchanging code for tokens:', error)
// // //         throw error
// // //     }
// // // }

// // // initiateAuthorization()

// // // const authorizationCode = 'BQAqkqrEbWV-JJj91taGwpfSoVcVdIjo1aViFFxS1OW8D_4rNnERQApRCb_1GIKkkR0UCha3bjsStr7b1GzFKdsnGiJcpgpzVk0nknlDUILKSz32CHQqzhJh6Mmkhg9-nAtCLrnhT2UyWbv8IZhmRnnf0jCrMNE4U7lWbPtxYeWJa2rFF7ZpUJ6nT38rQj9IQH3CshWHLiSR3fciO9o'
// // // exchangeCodeForTokens(authorizationCode)
// // //     .then((refresh_token) => {
// // //         console.log('Refresh Token:', refresh_token)
// // //     })
// // //     .catch((error) => {
// // //         console.error('Error getting refresh token:', error)
// // //     })




// // // async function _refreshToken(refreshToken) {

// // //     let accessToken = 'BQAnhJK2WGVQkdGtqHUicHznaHWJkTkBe70XnVpPUSwIkOPXTNoyyE--qF5nNAcNmoBe9vofX84-unW4Z0YqIfiLjwaxmOXdC0H2OLURYL36MUpDtRxwPkhz-BVV12WmRvTc9J8bfyRDPK04MkBV0LD8a-F6A46YZv8wRWs06q6wZu-uuKQ02nfdFCW4G0IWON4vObJ-c8cT2ihRndk'

// // //     const url = "https://accounts.spotify.com/api/token"

// // //     const payload = {
// // //         method: 'POST',
// // //         headers: {
// // //             'Content-Type': 'application/x-www-form-urlencoded'
// // //         },
// // //         body: new URLSearchParams({
// // //             grant_type: 'refresh_token',
// // //             refresh_token: refreshToken,
// // //             client_id: CLIENT_ID,
// // //             client_secret: CLIENT_SERCRET
// // //         }),
// // //     }

// // //     try {
// // //         const data = await fetch(url, payload)
// // //         const response = await data.json()
// // //         console.log('Refreshed Token:', response)
// // //         return response
// // //     } catch (error) {
// // //         console.error('Error refreshing token:', error)
// // //         throw error
// // //     }

// // // }



// // // function isTokenExpired(accessToken) {
// // //     console.log("accessToken:", accessToken)
// // //     try {
// // //         if (!accessToken) {
// // //             console.log('accessToken is empty or undefined.')
// // //             return true
// // //         }

// // //         const parts = accessToken.split('.')
// // //         if (parts.length !== 3) {
// // //             console.log('Invalid token structure: missing parts.')
// // //             return true
// // //         }

// // //         const decodedToken = jwtDecode(accessToken)
// // //         return decodedToken.exp * 1000 < Date.now()
// // //     } catch (err) {
// // //         console.log('Error decoding JWT:', err)
// // //         return true
// // //     }
// // // }



