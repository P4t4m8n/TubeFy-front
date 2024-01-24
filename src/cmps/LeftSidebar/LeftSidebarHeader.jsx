import { Link, useLocation } from "react-router-dom"
import { HomeSvg, HomeSvgClicked, SearchSvg, SearchSvgClicked } from "../../services/icons.service"


export function SideBarHeader() {

    const location = useLocation()
    const isSearchOpen = location.pathname.includes('search')

    return (
        <div className="left-sidebar-header">

            <ul className="clean-list">

                <li  >
                    <Link to={"/"} className={"flex align-center "}>
                        {isSearchOpen ? <HomeSvg></HomeSvg> : <HomeSvgClicked></HomeSvgClicked>}
                        <span>Home</span>
                    </Link>
                </li>

                <li >
                    <Link to={"/search"} className={"flex align-center"}>
                        {isSearchOpen ? <SearchSvgClicked></SearchSvgClicked> : <SearchSvg></SearchSvg>}
                        <span>Search</span>
                    </Link>
                </li>

            </ul>

        </div >
    )
}
