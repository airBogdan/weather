export function capitalize (string) {
    const splitString = string.split(' ')
    for (let i = 0; i < splitString.length; i++) {
        splitString[i] = splitString[i].charAt(0).toUpperCase() + splitString[i].slice(1);
    }
    return splitString.join(' ')
}

export function formatDate (timestamp, type) {
    const date = new Date(timestamp * 1000)

    let d = date.getDate()
    d = d < 10 ? addZero(d) : d

    let m = date.getMonth()
    m = m + 1 < 10 ? addZero(m + 1) : m + 1

    const y = date.getFullYear()

    let hr = date.getHours()
    hr = hr < 10 ? addZero(hr) : hr

    let mn = date.getMinutes()
    mn = mn < 10 ? addZero(mn) : mn

    if (type == 'time') return `${hr}:${mn}`
    else return `${d}.${m}.${y}`
}

function addZero (val) {
    return `0${val}`
}