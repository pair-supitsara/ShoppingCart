/* generate random filename */
export function generateFilename() {
    const date = new Date()
    return `${date.getFullYear()}${date.getMonth()}${date.getDate()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
}