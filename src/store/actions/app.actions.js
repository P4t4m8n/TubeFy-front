import { SET_CONTEXT_MENU, SET_DEVICE, SET_DRAG_OBJ, SET_IS_OPEN, SET_IS_SEARCH_OPEN } from "../redcuers/app.reducer";
import { store } from "../store";

export const DEF_IMG = 'https://res.cloudinary.com/dpnevk8db/image/upload/v1705531134/hxuhgoswvmpstkr1sbki.jpg'

export function setIsOpen(isOpen) {
    store.dispatch({ type: SET_IS_OPEN, isOpen: isOpen })
}

export function setSearchOpen(isSearchOpen) {
    store.dispatch({ type: SET_IS_SEARCH_OPEN, isSearchOpen })
}

export function setContextMenu(contextMenu) {
    store.dispatch({ type: SET_CONTEXT_MENU, contextMenu })
}

export function setDevice(device) {
    store.dispatch({ type: SET_DEVICE, device })
}

export function setDragObj(obj) {
    store.dispatch({ type: SET_DRAG_OBJ, obj })
}