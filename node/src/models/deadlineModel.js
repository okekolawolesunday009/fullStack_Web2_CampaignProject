const mongoose = require('mongoose')


const DeadlineSchema = new mongoose.Schema({
    deadline: { type: Date, required: true },
    activeState: { type: Boolean, default: true },
});

module.exports = DeadlineSchema