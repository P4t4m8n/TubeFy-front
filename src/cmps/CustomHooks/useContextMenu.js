// import { setContextMenu } from "../../store/actions/app.actions"


// export function useContextMenu({ item }) {

//     const activeContextMenuId = useSelector(storeState => storeState.appMoudle.playlistContextMenu)
//     const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })

//     const contextMenuRef = useRef(null)

//     function handleContextMenu(ev) {
//         ev.preventDefault()

//         const menuWidth = 160
//         const menuHeight = 160

//         let xPosition = ev.clientX
//         let yPosition = ev.clientY

//         if (xPosition + menuWidth > window.innerWidth) {
//             xPosition = ev.clientX - menuWidth
//         }

//         if (yPosition + menuHeight > window.innerHeight) {
//             yPosition = ev.clientY - menuHeight
//         }

//         setContextMenu(song.trackId)
//         setContextMenuPosition({ x: xPosition, y: yPosition })
//     }

//     function handleClickOutside(ev) {
//         if (contextMenuRef.current && !contextMenuRef.current.contains(ev.target)) {
//             setContextMenu(null)
//         }
//     }

//     useEffect(() => {
//         window.addEventListener('click', handleClickOutside)
//         return () => {
//             window.removeEventListener('click', handleClickOutside)
//         }
//     }, [])

//     return (
//         {activeContextMenuId === song.trackId && (
//             <ul ref={contextMenuRef} className="context-menu" style={{ position: 'absolute', top: `${contextMenuPosition.y}px`, left: `${contextMenuPosition.x}px` }}>
//                 <li>
//                     <select onChange={(ev) => {
//                         setContextMenu(null)
//                         onChangePlaylist(ev, song, id, isSearch)
//                     }} className="playlist-select">
//                         <option value="none">Pick Playlist</option>
//                         {user.stations.map((station, idx) => (
//                             station._id === id ?
//                                 <option key={idx} value="same">Current Playlist</option> :
//                                 <option key={idx} value={idx}>{station.name}</option>

//                         ))}
//                     </select>
//                 </li>
//                 {isEdit && <li onClick={(ev) => onRemoveSong(ev, song._id)}>Remove Song</li>}
//             </ul>
//         )}
//     )
// }