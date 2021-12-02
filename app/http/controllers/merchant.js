// merchant controllers

const generateNewInvoice = (customerId, amount, dueDate)=>{

    // save to the database
    return {
        invoiceId: "123",
        status: "notPaid",
        summary: ""
    }
    
}

const pendingCreditsMerchant = (merchantId)=>{

    // get all the pending credits of a particular merchant

    let invoice = {
        customerId: "998822",
        invoiceId: "123",
        dueData: "12-12-2020",
        summary: "A quick summary!!",
        status: "notpaid"
    }

    return [invoice, invoice, invoice]
}

const previousHistory = (merchantId)=>{

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

const sendReminder = (customerId, merchantId, invoiceId)=>{
    return {
        message: "Reminder Sent!!"
    }
}

const deleteInvoice = (invoiceId)=>{
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