import { PC } from "../../cmps/CustomHooks/UseDeviceCheck"

export const SET_FILTER = "SET_FILTER"
export const SET_IS_OPEN = "SET_IS_OPEN"
export const SET_IS_SEARCH_OPEN = "SET_IS_SEARCH_OPEN"
export const SET_CONTEXT_MENU = "SET_CONTEXT_MENU"
export const SET_DEVICE = 'SET_DEVICE'
export const SET_DRAG_OBJ = 'SET_DRAG_OBJ'

const initialSate = {
    filterSortBy: { txt: '', sortBy: '', likeBy: '' },
    isOpen: false,
    isSearchOpen: false,
    grident: [],
    playlistContextMenu: '',
    device: PC,
    dragObj: { item:{}, from:{}} 
}

export function appRedcuer(state = initialSate, action = {}) {

    switch (action.type) {

        case SET_FILTER:
            let filterSortBy = { ...state.filterSortBy, ...action.filterSort }
            return { ...state, filterSortBy }

        case SET_IS_OPEN:
            return { ...state, isOpen: action.isOpen }

        case SET_IS_SEARCH_OPEN:
            return { ...state, isSearchOpen: action.isSearchOpen }

        case SET_CONTEXT_MENU:
            return { ...state, playlistContextMenu: action.contextMenu }

        case SET_DEVICE:
            return { ...state, device: action.device }

        case SET_DRAG_OBJ:
            return { ...state, dragObj: action.obj }

        default:
            return state
    }
}