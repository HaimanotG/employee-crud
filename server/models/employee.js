const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female'],
    },
    salary: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model('Employee', employeeSchema)