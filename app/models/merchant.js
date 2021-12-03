const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    interestAmount: {
        type: Number,
        required: true
    },
    apiKey:{
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})

mongoose.exports = mongoose.model('Customer', schema)