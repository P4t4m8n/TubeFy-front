import { userService } from "../../services/user.service"

export const SET_USER = 'SET_USER'
export const EDIT_USER = 'EDIT_USER'

const initialState = {
    userObj: userService.getLoggedinUser(),

}

export function userReducer(state = initialState, action = {}) {


    switch (action.type) {
        case SET_USER:
            return { ...state, userObj: action.user }

        case EDIT_USER:

            return { ...state, userObj: action.updatedUser }

        default:
            return state
    }
}
