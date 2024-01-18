// import { useSelector } from "react-redux"
// import { utilService } from "../../services/util.service"


// export function RightSidebar() {

//     const song = useSelector(storeState => storeState.songMoudle.currSong)
//     const isOpen = useSelector(storeState => storeState.appMoudle.isOpen)
//     const width = isOpen ? '300px' : '0px'
//     const hiddenClass = isOpen ? '' : 'hidden'



//     return (
//         <div className={`right-sidebar ${hiddenClass}`} style={{ width: width }}>

//             <div className="flex">
//                 <h3>Station(playlist) Title</h3>
//                 <button>❎</button>
//             </div>

//             <img src="\src\assets\img\forward_ohmney.svg"></img>
//             <div>
//                 <div>
//                     <p>{song.title}</p>
//                     <p>{song.artist}</p>
//                 </div>

//                 <div>
//                     <button>Like</button>
//                     <button>...</button>
//                 </div>

//                 <img src="\src\assets\img\forward_ohmney.svg"></img>
//                 <div>
//                     <p>{song.artist}</p>
//                     <p>6,546,456</p>
//                 </div>
//                 <button>Follow</button>
//                 <p>{utilService.makeLorem()}</p>
//                 <div>
//                     <p>You queue is empy</p>
//                     <button>Search for somthing new</button>
//                 </div>
//             </div>

//         </div>
//     )
// }