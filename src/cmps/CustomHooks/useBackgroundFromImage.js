

import { useEffect, useState } from 'react'
import ColorThief from 'colorthief'

export function useBackgroundFromImage(imageUrl, el = '.main-content') {

    const [gradient, setGradient] = useState('linear-gradient(to bottom, #1a1a1a 0%, #0a0a0a 100%)')

    useEffect(() => {
        if (imageUrl) {
            const img = new Image()
            img.crossOrigin = 'Anonymous'
            img.src = imageUrl
            img.onload = async () => {
                const colorThief = new ColorThief()
                const palette = colorThief.getPalette(img, 2)
                const gradientColors = palette.map(rgb => `rgb(${rgb.join(',')})`)
                setGradient(`linear-gradient(to bottom, 
                    ${gradientColors[0]} 0%, 
                    ${gradientColors[1]} 25%, 
                    #121212 50%, 
                    #121212 75%,   
                    #121212 100%)`)
            }
        }
        else setGradient('linear-gradient(to bottom, #1a1a1a 0%, #0a0a0a 100%)')

    }, [imageUrl])

    useEffect(() => {
        document.querySelector(el).style.background = gradient
    }, [gradient])
}
