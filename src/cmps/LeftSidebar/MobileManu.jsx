import { Link, useLocation } from "react-router-dom"
import { HomeSvg, HomeSvgClicked, SearchSvg, SearchSvgClicked ,Libary} from "../../services/icons.service"



export function MobileManu(){
    const location = useLocation()
    const isSearchOpen = location.pathname.includes('search')


    return (
        <div className="mobile-manu">

            <ul className="manu-list">

                <li  >
                    <Link to={"/"} >
                        {isSearchOpen ? <HomeSvg></HomeSvg> : <HomeSvgClicked></HomeSvgClicked>}
                        <span>Home</span>
                    </Link>
                </li>

                <li >
                    <Link to={"/search"} >
                        {isSearchOpen ? <SearchSvgClicked></SearchSvgClicked> : <SearchSvg></SearchSvg>}
                        <span>Search</span>
                    </Link>
                </li>

                <li>
                <Link to={"/"}   >
                    <Libary></Libary>
                    <span>Library</span>
                    </Link>
                </li>

            </ul>

        </div >
    )
}
