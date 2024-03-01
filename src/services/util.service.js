export const utilService = {
    // makeId,
    // makeLorem,
    // getRandomIntInclusive,
    // loadFromStorage,
    // saveToStorage,
    debounce,
    // getRandomColor,
    formatTime,
}

const makeId = (length = 16) => {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


const makeLorem = (size = 100) => {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television',
        'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less',
        '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and',
        'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story',
        '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const saveToStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

const loadFromStorage = (key) => {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function debounce(func, delay = 2000) {
    let timeoutId
    return function (...args) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}


function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds} `
}

export const handleKeyboardInteraction = (ev, cb) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        cb()
    }
}

