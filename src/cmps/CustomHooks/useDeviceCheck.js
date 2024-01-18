import { useEffect, useState } from "react"
import { setDevice } from "../../store/actions/app.actions"
import { useSelector } from "react-redux"

export const MOBILE = 'MOBILE'
export const PC = 'PC'
export const TABLET = 'TABLET'

export function useDeviceCheck() {

    const device = useSelector(storeState => storeState.appMoudle.device)

    const prevDevice = device
    let t
    useEffect(() => {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            t = MOBILE
        } else {
            t = PC
        }

        if (t !== prevDevice) {
            console.log("device:", t)
            document.querySelector('.main-container').classList.add(t)
            setDevice(t)

        }

    }, [device])
}