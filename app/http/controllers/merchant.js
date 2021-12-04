// merchant controllers
const Invoice = require('../../models/invoice')
const Merchant = require('../../models/merchant')
const Razorpay = require('razorpay')

const getMerchant = async(merchantId)=>{
    let cus = await Merchant.findOne({ _id: merchantId }).exec()
    return cus
} 

const newLink = async (name, email, description, contact)=>{
    try{

        let instance = new Razorpay({
            key_id: 'rzp_test_N3295ATbaLKKZ3', // TODO: Fetch from merchant's db
            key_secret: 'JvUyfam7fFg4ugYVh0a83iYh',
        });        

        // convert contact to string
        contact = "91"+contact

        let response = await instance.paymentLink.create({
            upi_link: false,
            amount: 500,
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
        return response
    } catch(err){
        console.log('Error ', err)
    }

    return 
}

const generateNewInvoice = async (merchantId, customerId, amount, dueDate, summary)=>{

    let merchant = await getMerchant(merchantId)

    let invoice = new Invoice({
        merchantId: merchantId,
        customerId: customerId,
        due: dueDate,
        summary: summary,
        amount: amount,
        status: "notPaid",
        interestAmount: merchant.interestAmount
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