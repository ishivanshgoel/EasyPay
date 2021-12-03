// customer controllers
let Customer = require('../../models/customer')
let Invoice = require('../../models/invoice')
const {getMerchant} = require('./merchant')

const pay = (customerId, merchantId, invoiceId)=>{
    return {
        status: "paid"
    }
}

const getCustomer = async(customerId)=>{
    let cus = await Customer.findOne({ _id: customerId }).exec()
    return cus
} 

const pendingCredits = async (customerId)=>{

    // get all the pending credits of a particular customer
    let invoice = await Invoice.find({ customerId: customerId, status: "notPaid" }).exec()
    
    return invoice
}

const paidHistory = async (customerId)=>{

    // get all the paid invoices of a particular merchant

    let invoice = await Invoice.find({ customerId: customerId, status: "paid" }).exec()

    return invoice

}

module.exports = {
    pendingCredits,
    paidHistory,
    pay,
    getCustomer
}