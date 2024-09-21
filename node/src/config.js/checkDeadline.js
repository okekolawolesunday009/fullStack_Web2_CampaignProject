const checkDeadline = (deadline) => {
    const currentDate = new Date()

    if (deadline > currentDate ) return false
    else return true
}
module.exports = {
    checkDeadline
}