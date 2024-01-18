import axios from "axios"


// Function to get Spotify Access Token
async function getSpotifyAccessToken(clientId, clientSecret) {
    const response = await axios.get('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
        },
        body: 'grant_type=client_credentials'
    })
    const data = await response.json()
    return data.access_token
}

// Function to search on Spotify
async function searchOnSpotify(query, accessToken) {
    console.log("query:", query)
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
    const data = await response.json()
    return data
}

// Example usage
export async function getSpotify(query) {
    const clientId = '5a37d9f51dbf40c8a317e065f0993a47'
    const clientSecret = '88c5089152e04a7aa4cdaf5127898e0f'

    try {
        const accessToken = await getSpotifyAccessToken(clientId, clientSecret)
        const searchResult = await searchOnSpotify(query, accessToken)
        console.log(searchResult)
    } catch (error) {
        console.error('Error:', error)
    }
}
