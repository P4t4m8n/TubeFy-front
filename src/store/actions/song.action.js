
import { SET_PLAYING, SET_SONG } from "../redcuers/song.reducer"
import { store } from "../store"

export function loadSong(song) {
    return store.dispatch({ type: SET_SONG, song })
}

export function setPlaying(isPlaying) {
    store.dispatch({ type: SET_PLAYING, isPlaying })
}


