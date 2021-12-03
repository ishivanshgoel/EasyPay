// merchant controllers
const Invoice = require('../../models/invoice')

const generateNewInvoice = async (merchantId, customerId, amount, dueDate, summary)=>{

    let invoice = new Invoice({
        merchantId: merchantId,
        customerId: customerId,
        due: dueDate,
        summary: summary,
        amount: amount,
        status: "notPaid"
    })

    await invoice.save()
    console.log('New Invoice ', invoice)
    // save to the database
    return invoice
    
}

const pendingCreditsMerchant = async (merchantId)=>{

    // get all the pending credits of a particular merchant
    let invoice = await Invoice.find({ merchantId: merchantId, status: "notPaid" }).exec()
    console.log("Invoices ", invoice)
    return invoice

}

const previousHistory = async (merchantId)=>{

    // get all the paid invoices of a particular merchant

    let invoice = {
        customerId: "998822",
        invoiceId: "123",
        dueData: "12-12-2020",
        summary: "A quick summary!!",
        status: "paid"
    }

    return [invoice, invoice, invoice]

}

const sendReminder = async (customerId, merchantId, invoiceId)=>{
    return {
        message: "Reminder Sent!!"
    }
}

const deleteInvoice = async (invoiceId)=>{
    return {
        message: "Deleted Successfully!!"
    }
}

module.exports = {
    generateNewInvoice,
    pendingCreditsMerchant,
    previousHistory,
    sendReminder,
    deleteInvoice
}