import { songService } from '../../services/song.service'
import { stationService } from '../../services/station.service'

export const SET_SONG = 'SET_SONG'
export const SET_PLAYING = 'SET_PLAYING'
export const SET_VOLUME = 'SET_VOLUME'
export const SET_PLAYER = 'SET_PLAYER'

const initialState = {
    currSong: songService.getDefaultSong(),
    isPlaying: false,
    volume: 50,
}

export function songReducer(state = initialState, action = {}) {

    switch (action.type) {
        case SET_SONG:
            return { ...state, currSong: action.song }

        case SET_PLAYING:
            const playing = state.isPlaying
            console.log("playing:", playing)
            return { ...state, isPlaying: !playing }

        case SET_VOLUME:
            return { ...state, volume: action.volume }

        default:
            return state
    }
}

