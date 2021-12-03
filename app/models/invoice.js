const mongoose = require('mongoose')

const schemaInvoice = new mongoose.Schema({
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

module.exports = mongoose.model('Invoice', schemaInvoice)