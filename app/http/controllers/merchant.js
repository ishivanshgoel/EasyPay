// merchant controllers
const Invoice = require('../../models/invoice')
const Merchant = require('../../models/merchant')
const Razorpay = require('razorpay')

const getMerchant = async(merchantId)=>{
    let cus = await Merchant.findOne({ _id: merchantId }).exec()
    return cus
} 

const newLink = async (name, email, description, contact, key_id, key_secret)=>{
    try{

        let instance = new Razorpay({
            key_id: key_id, // TODO: Fetch from merchant's db
            key_secret: key_secret,
        });        

        // convert contact to string
        contact = "91"+contact

        let response = await instance.paymentLink.create({
            upi_link: false,
            amount: 500*100,
            currency: "INR",
            accept_partial: true,
            first_min_partial_amount: 100,
            description: description,
            customer: {
              name: name,
              email: email,
              contact: contact
            },
            notify: {
              sms: true,
              email: true
            },
            reminder_enable: true,
          })
        console.log('Reminder ', response)
        return response
    } catch(err){
        console.log('Error ', err)
    }

    return 
}

const generateNewInvoice = async (merchantId, customerId, amount, dueDate, summary)=>{
    let inAm = 0
    let merchant = await getMerchant(merchantId)
    if(!merchant) inAm = 1
    else inAm = merchant.interestAmount

    let invoice = new Invoice({
        merchantId: merchantId,
        customerId: customerId,
        due: dueDate,
        summary: summary,
        amount: amount,
        status: "notPaid",
        interestAmount: inAm
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
    deleteInvoice,
    getMerchant,
    newLink
}