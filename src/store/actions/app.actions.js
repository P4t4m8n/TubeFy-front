import { SET_CONTEXT_MENU, SET_DRAG_OBJ } from "../redcuers/app.reducer";
import { store } from "../store";

export const DEF_IMG = 'https://res.cloudinary.com/dpnevk8db/image/upload/v1705531134/hxuhgoswvmpstkr1sbki.jpg'

export function setContextMenu(contextMenu) {
    store.dispatch({ type: SET_CONTEXT_MENU, contextMenu })
}

export function setDragObj(obj) {
    store.dispatch({ type: SET_DRAG_OBJ, obj })
}