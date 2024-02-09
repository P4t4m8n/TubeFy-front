import { SideBarHeader } from "./LeftSidebarHeader.jsx"
import { SideBarContent } from "./LeftSidebarContent.jsx"

export function LeftSidebar() {

    return (
        <div className='left-sidebar'>
            <SideBarHeader />
            <SideBarContent />
        </div>
    )
}

