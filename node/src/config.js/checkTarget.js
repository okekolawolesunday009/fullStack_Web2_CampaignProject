
const checkTarget = (target, targetDeposit) => {
    if (target < targetDeposit ) return false
    else return true
}

module.exports = {
    checkTarget
}
