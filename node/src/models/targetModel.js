const mongoose = require('mongoose')


const TargetSchema = new mongoose.Schema({
    target: { type: Number, required: true },
    targetDeposit: { type: Number, default: 0 },
    targetState: { type: Boolean, default: false },
});


module.exports = TargetSchema