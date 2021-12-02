const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    accountApiKey:{
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})

mongoose.exports = mongoose.model('Customer', schema)