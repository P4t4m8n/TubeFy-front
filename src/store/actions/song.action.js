
import { songService } from "../../services/song.service";
import { SET_PLAYING, SET_SONG, SET_VOLUME } from "../redcuers/song.reducer";
import { store } from "../store";


export function loadSong(song) {
    return store.dispatch({ type: SET_SONG, song })
}


export async function saveSong(song) {
    try {
        const savedsong = await songService.save(song)
        return savedsong
    }
    catch (err) {
        console.log('song Action -> Cannot save song', err)
        throw err
    }
}
export function setPlaying(isPlaying) {

    store.dispatch({ type: SET_PLAYING, isPlaying })
}

export function setVolume(lvl) {

    store.dispatch({ type: SET_VOLUME, volume: lvl })
}

