
export const SET_PLAYER = "SET_PLAYER"
export const SET_PLAY = "SET_PLAY"

const initialSate = {
    player: null,
    setPlay: false
}

export function playerReducer(state = initialSate, action = {}) {

    switch (action.type) {

        case SET_PLAYER:
            return { ...state, player: action.player }

        case SET_PLAY:
            return { ...state, setPlay: action.play }

        default:
            return state
    }
}