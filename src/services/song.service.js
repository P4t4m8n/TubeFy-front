
export const songService = {
    getDefaultSong,
}

function getDefaultSong() {
    return {
        name: 'Winamp Intro',
        album: 'Single',
        artist: 'Winamp',
        type: 'song',
        duration: "00:06",
        _id: 'oQid2jSU7Ww',
        imgUrl: 'http://res.cloudinary.com/dpnevk8db/image/upload/v1705451444/mg5yzhho5xauepryttiw.svg',
        addedBy: 'artist',
        addedAt: (Date.now() + 1) - Date.now(),
        likedBy: []
    }
}

