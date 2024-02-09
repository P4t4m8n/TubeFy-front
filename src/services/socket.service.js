
import io from 'socket.io-client'
import { userService } from './user.service'

// Chat
export const SOCKET_EVENT_ADD_MSG = 'chat-add-msg'
export const SOCKET_EMIT_SEND_MSG = 'chat-send-msg'

//Playlist

export const SOCKET_EMIT_SEND_PLAYLIST = 'user-send-playlist'
export const SOCKET_EVENT_SEND_PLAYLIST_TO_YOU = 'user-get-playlist'
export const SOCKET_EMIT_USER_LIKE_PLAYLIST = 'user-like-playlist'
export const SOCKET_EMIT_USER_DISLIKE_PLAYLIST = 'user-dislike-playlist'
export const SOCKET_EMIT_PLAYLIST_UPDATED = 'playlist-updated'
export const SOCKET_EVENT_PLAYLIST_UPDATED = 'like-playlist-updated'

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'


const baseUrl =  (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()

window.socketService = socketService

socketService.setup()

function createSocketService() {
  var socket = null;
  const socketService = {
    setup() {
      socket = io(baseUrl)
      const user = userService.getLoggedinUser()
      if (user) this.login(user._id)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      socket.emit(eventName, data)
    },
    login(userId) {
      socket.emit(SOCKET_EMIT_LOGIN, userId)
    },
    logout() {
      socket.emit(SOCKET_EMIT_LOGOUT)
    },
    terminate() {
      socket = null
    },

  }
  return socketService
}
