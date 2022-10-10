
let length = 6
let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const generateId = () => {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

//propper Format
const getTimeFromMins = (mins) => {
    let hours = Math.trunc(mins / 60)
    let minutes = mins % 60
    return hours + ' hr ' + minutes + ' min '
}

//another Format
const getTimeFromMin2 = (mins) => {
    let hours = Math.trunc(mins / 60)
    let minutes = mins % 60
    return hours + ':' + minutes
}

module.exports = {
    generateId,
    getTimeFromMins,
    getTimeFromMin2
}