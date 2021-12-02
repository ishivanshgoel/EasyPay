// customer controllers

const pay = (customerId, merchantId, invoiceId)=>{
    return {
        status: "paid"
    }
}

const pendingCredits = (customerId)=>{

    // get all the pending credits of a particular customer

    let invoice = {
        merchantId: "998822",
        invoiceId: "123",
        dueData: "12-12-2020",
        summary: "A quick summary!!",
        status: "notpaid"
    }

    return [invoice, invoice, invoice]
}

const paidHistory = (merchantId)=>{

    // get all the paid invoices of a particular merchant

    let invoice = {
        merchantId: "998822",
        invoiceId: "123",
        dueData: "12-12-2020",
        summary: "A quick summary!!",
        status: "paid"
    }

    return [invoice, invoice, invoice]

}

module.exports = {
    pendingCredits,
    paidHistory,
    pay
}