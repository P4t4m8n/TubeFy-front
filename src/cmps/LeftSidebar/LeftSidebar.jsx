
import { React } from 'react'


import { SideBarHeader } from "./LeftSidebarHeader.jsx"
import { SideBarContent } from "./LeftSidebarContent.jsx"
import { useSelector } from 'react-redux'
import { MOBILE, useDeviceCheck } from '../CustomHooks/UseDeviceCheck.js'
import { MobileManu } from './MobileManu.jsx'


export function LeftSidebar() {

    const device = useSelector(storeState => storeState.appMoudle.device)
    useDeviceCheck()

    return (
        <DynmicSidebarCmp device={device}  ></DynmicSidebarCmp>
    )
}


function DynmicSidebarCmp(props) {
    switch (props.device) {
        case MOBILE:
            return <MobileManu {...props} />

        default:
            return (
                <div className='left-sidebar'>
                    <SideBarHeader />
                    <SideBarContent />
                </div>
            )

    }
}