import { Link, useLocation } from "react-router-dom"
import { HomeSvg, HomeSvgClicked, SearchSvg, SearchSvgClicked } from "../../services/icons.service"

export function Navigation() {

    const location = useLocation()
    const isSearchOpen = location.pathname.includes('search')

    return (
        <ul className="left-sidebar-header clean-list">

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
    )
}
