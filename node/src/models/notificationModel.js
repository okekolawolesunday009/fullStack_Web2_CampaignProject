const mongoose = require('mongoose');


const NotificationSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    message: {
        type: String,
        required: true,

    },
    type: {
        type: String, 
        required: true
    },
    campaignId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Campaign'
    },
    isRead: {
        type: Boolean, default: false
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Notification = mongoose.model('Notification', NotificationSchema)
module.exports = Notification