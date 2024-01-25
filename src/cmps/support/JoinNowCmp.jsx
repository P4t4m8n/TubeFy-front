import { useEffect, useRef, useState } from "react"
import { utilService } from "../../services/util.service"

export function JoinNowCmp() {

    const elNoUser = useRef(null)
    const strArr = [
        "C", "o", "n", "n", "e", "c", "t", "\u00A0", "a", "n", "d", "\u00A0", "s", "t", "a", "r", "t", "\u00A0",
        "c", "r", "e", "a", "t", "i", "n", "g", "\u00A0", "y", "o", "u", "r", "\u00A0", "o", "w", "n", "\u00A0",
        "p", "l", "a", "y", "l", "i", "s", "t", "s"
    ]


    useEffect(() => {
        spanAllLetters()
    }, [])

    function toggleAnimation() {
        elNoUser.current.style.animationduration = 1
    }

    function spanAllLetters() {

        for (var j = 0; j < elNoUser.current.children.length; j++) {
            elNoUser.current.children[j].style.animationDelay = utilService.getRandomIntInclusive(1, 5000) + 'ms'
        }
    }

    return (

        <h3
            onMouseEnter={toggleAnimation}
            ref={elNoUser} className="no-user-join"
        >
            {strArr.map((char, idx) => <span key={idx}>{char || ' '}</span>)}
        </h3>

    )
}