import { songService } from '../../services/song.service'

export const SET_SONG = 'SET_SONG'
export const SET_PLAYING = 'SET_PLAYING'

const initialState = {
    currSong: songService.getDefaultSong(),
    isPlaying: false,
}

export function songReducer(state = initialState, action = {}) {

    switch (action.type) {
        case SET_SONG:
            return { ...state, currSong: action.song }

        case SET_PLAYING:
            const playing = state.isPlaying
            return { ...state, isPlaying: !playing }

        default:
            return state
    }
}

