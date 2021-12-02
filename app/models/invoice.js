const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    merchantId: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    due: {
        type: Date,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

mongoose.exports = mongoose.model('Invoice', schema)