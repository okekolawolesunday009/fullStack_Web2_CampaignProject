const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'attendee', 'author'],
        // required: true
    },
    email: {
        type: String,
        required: true,
        isLowercase: true,
        // validate: {
        //     validator: (value) => isEMail(value),
        //     message: `email is not a valid email`
        // }//coming back
    }, 
    password: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'https://example.com/default-profile-image.jpg'
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
    updatedAt: {
        type: Date,
        default: Date.now,
      },
})

const User = mongoose.model('User', userSchema)

module.exports = User