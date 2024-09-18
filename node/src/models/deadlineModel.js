const mongoose = require('mongoose')


const deadlineSchema = new mongoose.Schema({
    campaignId : { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
        required: true
    },
    deadlineDate: {
        type: Date,
        required: true
    },
    activeState: {
        type: Boolean,
        required: true
    }

})


const Deadline = mongoose.model('Deadline', deadlineSchema)
module.exports = Deadline