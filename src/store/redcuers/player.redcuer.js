
export const SET_PLAYER = "SET_PLAYER"


const initialSate = {
    player: null,
}

export function playerReducer(state = initialSate, action = {}) {

    switch (action.type) {

        case SET_PLAYER:
            return { ...state, player: action.player }

        default:
            return state
    }
}