

export const START_RESIZING = ''

const initialState = {
  width: 240, 
  isResizing: false,
}

export function sidebarReducer(state = initialState, action) {

  switch (action.type) {

    case 'START_RESIZING':
      return { ...state, isResizing: true }

    case 'STOP_RESIZING':
      return { ...state, isResizing: false }

    case 'RESIZE_SIDEBAR':
      return { ...state, width: action.width }

    default:
      return state
  }
}
