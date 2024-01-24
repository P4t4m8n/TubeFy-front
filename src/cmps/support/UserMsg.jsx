import {  eventBusService, showSuccessMsg } from "../../services/event-bus.service.js"
import { useState, useEffect, useRef } from 'react'
import { socketService } from "../../services/socket.service.js"
import { SOCKET_EVENT_SEND_PLAYLIST_TO_YOU } from "../../services/socket.service.js"

export function UserMsg() {

  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef()

  useEffect(() => {
    const unsubscribe = eventBusService.on('show-msg', (msg) => {
      setMsg(msg)
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (timeoutIdRef.current) {
        timeoutIdRef.current = null
        clearTimeout(timeoutIdRef.current)
      }
      timeoutIdRef.current = setTimeout(closeMsg, 3000)
    })

    // Todo : Add listener for a review added about me
    socketService.on(SOCKET_EVENT_SEND_PLAYLIST_TO_YOU, (msg) => {
      console.log("msg:", msg)
      showSuccessMsg(msg)
    })

    return () => {
      unsubscribe()
      socketService.off(SOCKET_EVENT_SEND_PLAYLIST_TO_YOU)
    }
  }, [])

  function closeMsg() {
    setMsg(null)
  }

  if (!msg) return <span></span>
  return (
    <section className={`user-msg ${msg.type}`}>
      <button onClick={closeMsg}>x</button>
      {msg.txt}
    </section>
  )
}