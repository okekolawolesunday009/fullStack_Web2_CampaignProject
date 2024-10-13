const mongoose = require('mongoose');
const DeadlineSchema = require('./deadlineModel');
const TargetSchema = require('./targetModel');

const campaignSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    category: {
        type: String,
        required: true
    },
    deadline:   DeadlineSchema,
    target: TargetSchema,

    image: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

});


const Campaign = mongoose.model('Campaign', campaignSchema)

module.exports = Campaign