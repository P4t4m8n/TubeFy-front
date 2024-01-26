import { ContextMenuPlaylist } from "./ContextMenuPlaylist"
import { ConttextMenuSong } from "./ContextMenuSong"



export function ContextMenu(props) {
    const { contextMenuPosition } = props
    return (
        <ul className="context-menu"
            style={{
                position: 'absolute',
                top: `${contextMenuPosition.y}px`,
                left: `${contextMenuPosition.x}px`
            }}>
            <DynmicContextMenu
                props={props}>
            </DynmicContextMenu>

        </ul>

    )
}

function DynmicContextMenu({props}) {
    switch (props.item.type) {
        case 'playlist':
            return <ContextMenuPlaylist {...props} />
        case 'song':
            return <ConttextMenuSong {...props} />

        default:
            break
    }
}