import { Navigation } from "./Navigation.jsx"
import { UserLibaryIndex } from "./UserLibaryIndex.jsx"

export function LeftSidebar() {

    return (
        <div className='left-sidebar flex column'>
            <Navigation />
            <UserLibaryIndex />
        </div>
    )
}

