import { SHOW_MSG, eventBus, showSuccessMsg } from "../../services/event-bus.service.js"
import { useState, useEffect, useRef } from 'react'
import { SOCKET_EVENT_PLAYLIST_UPDATED, socketService } from "../../services/socket.service.js"
import { SOCKET_EVENT_SEND_PLAYLIST_TO_YOU } from "../../services/socket.service.js"
import { Link } from "react-router-dom"
import { userService } from "../../services/user.service.js"
import { updateUser } from "../../store/actions/user.actions.js"

export function UserMsg() {

  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef()

  useEffect(() => {
    const unsubscribe = eventBus.on(SHOW_MSG, (msg) => {
      setMsg(msg)
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
        timeoutIdRef.current = null
      }
      timeoutIdRef.current = setTimeout(closeMsg, 2000)
    })

    socketService.on(SOCKET_EVENT_SEND_PLAYLIST_TO_YOU, (msg) => {
      msg.txt = 'Share a playlist with you!'
      showSuccessMsg(msg)
    })

    socketService.on(SOCKET_EVENT_PLAYLIST_UPDATED, (station) => {
      const user = userService.getLoggedinUser()
      const newStations = user.stations.map(userStation => (station._id === userStation._id) ? station : userStation)
      updateUser({ ...user, stations: newStations })

    })

    return () => {
      unsubscribe()
      socketService.off(SOCKET_EVENT_SEND_PLAYLIST_TO_YOU)
      socketService.off(SOCKET_EVENT_PLAYLIST_UPDATED)
    }
  }, [msg])

  function closeMsg() {
    setMsg(null)
  }

  if (!msg) return <span></span>

  return (
    <section className={`user-msg ${msg.type}`}>
      <img src={msg.msgObj.imgUrl ? msg.msgObj.imgUrl
        :
        "https://res.cloudinary.com/dpnevk8db/image/upload/v1705844322/zvo0mhdh6lyqgvpavfob.png"}>

      </img>
      {msg.msgObj.itemName && <h5>{msg.msgObj.itemName}</h5>}

      {msg.msgObj.stationId ? <Link to={'/' + msg.msgObj.stationId}>{msg.msgObj.txt}</Link>
        :
        <span> {msg.msgObj.txt}</span>
      }
    </section>
  )
}
