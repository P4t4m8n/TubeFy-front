import { useCallback, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { setContextMenu } from "../../store/actions/app.actions"

export function useContextMenu() {

    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })
    const activeContextMenuId = useSelector(storeState => storeState.appMoudle.playlistContextMenu)
    const isFirstTouch = useRef(true)

    useEffect(() => {

        window.addEventListener('click', handleClickOutside)
        return () => {
            window.removeEventListener('click', handleClickOutside)
        }
    }, [])

    function handleContextMenu(ev, item = null, ref, parentRef) {
        ev.preventDefault()
        const menuWidth = 230
        const menuHeight = 200
        let xPosition
        let yPosition
        if (parentRef) {
            xPosition = (parentRef.getBoundingClientRect().x) + 160
            yPosition = (parentRef.getBoundingClientRect().y) + 10
        } else {

            xPosition = ev.clientX
            yPosition = ev.clientY
        }

        if (xPosition + menuWidth > window.innerWidth) {
            xPosition = xPosition - menuWidth
        }

        if (yPosition + menuHeight > window.innerHeight) {
            yPosition = yPosition - (menuHeight / 2)
        }

        if (item) setContextMenu(item._id)
        setContextMenuPosition({ x: xPosition, y: yPosition })
    }

    const handleClickOutside = useCallback((ev) => {
        if (ev.pointerType == 'touch' && isFirstTouch.current) {
            isFirstTouch.current = false
            return
        }
        if (ev.srcElement.classList.contains("context-click")) return
        
        setContextMenu(null)
        isFirstTouch.current = true
    }, [])




    return { activeContextMenuId, contextMenuPosition, handleContextMenu }

}