import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { setContextMenu } from "../../store/actions/app.actions"
import { Flag } from "@mui/icons-material"

export function useContextMenu({ item }) {

    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })
    const activeContextMenuId = useSelector(storeState => storeState.appMoudle.playlistContextMenu)
    const isFirstTouch = useRef(true)

    const itemId = (item.type === 'playlist') ? item._id : item.trackId

    useEffect(() => {
        window.addEventListener('click', handleClickOutside)
        return () => {
            window.removeEventListener('click', handleClickOutside)
        }
    }, [])

    function handleContextMenu(ev) {
        console.log("ev:", ev.clientX)

        ev.preventDefault()

        const menuWidth = 250
        const menuHeight = 50

        let xPosition = ev.clientX
        let yPosition = ev.clientY

        if (xPosition + menuWidth > window.innerWidth) {
            xPosition = ev.clientX - menuWidth
        }

        if (yPosition + menuHeight > window.innerHeight) {
            yPosition = ev.clientY - menuHeight
        }

        setContextMenu(itemId)
        setContextMenuPosition({ x: xPosition, y: yPosition })
    }

    function handleClickOutside(ev) {
        ev.preventDefault()
        console.log("ev:", ev)
        if (ev.pointerType == 'touch' && isFirstTouch.current) {
            isFirstTouch.current = false
            return
        }
        if (ev.srcElement.classList[0] === 'playlist-select') return

        setContextMenu(null)
        isFirstTouch.current = true


    }

    return [activeContextMenuId, contextMenuPosition, handleContextMenu]

}