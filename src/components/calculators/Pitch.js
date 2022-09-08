const Pitch = (w, p) => {
    const width = (w /2) - .3
    const radians = Math.cos((p * Math.PI) / 180)
    const wholeDist = Math.round(((width) / radians) * 1000) / 1000
    return wholeDist
}

export default Pitch
