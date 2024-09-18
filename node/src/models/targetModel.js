const mongoose = require('mongoose')


const targetSchema = new mongoose.Schema({
    campaignId : { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
        required: true
    },
    target: {
        type: Number,
        required: true
    },
    targetDeposit:{
        type: Number,
        required: true
    },
    targetState: {
        type: Boolean,
        required: true
    }

})


const Target = mongoose.model('Target', targetSchema)
module.exports = Target