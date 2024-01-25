import { SHOW_MSG, eventBus, showSuccessMsg } from "../../services/event-bus.service.js"
import { useState, useEffect, useRef } from 'react'
import { socketService } from "../../services/socket.service.js"
import { SOCKET_EVENT_SEND_PLAYLIST_TO_YOU } from "../../services/socket.service.js"

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
      timeoutIdRef.current = setTimeout(closeMsg, 300000)
    })

    socketService.on(SOCKET_EVENT_SEND_PLAYLIST_TO_YOU, (msg) => {
      showSuccessMsg(msg)
    })

    return () => {
      unsubscribe()
      socketService.off(SOCKET_EVENT_SEND_PLAYLIST_TO_YOU)
    }
  }, [msg])

  function closeMsg() {
    setMsg(null)
  }

  if (!msg) return <span></span>
  console.log("msg:", msg)

  return (
    <section className={`user-msg ${msg.type}`}>
      {msg.msgObj.imgUrl && <img src={msg.msgObj.imgUrl}></img>}
      {msg.msgObj.itemName && <h5>{msg.msgObj.itemName}</h5>}  <span> {msg.msgObj.txt}</span>
    </section>
  )
}
