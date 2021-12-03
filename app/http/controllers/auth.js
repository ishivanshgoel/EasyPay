const Customer = require('../../models/customer')
const Merchant = require('../../models/merchant')

const createNewCustomer = async (email, password, name, phoneNumber)=>{

    let customer = new Customer({
        email,
        password,
        name,
        phoneNumber
    })

    await customer.save()

    return customer

}


const createNewMerchant = async (email, password, name, address, interestAmount, apiKey)=>{

    let merchant = new Merchant({
        email,
        password,
        name,
        address,
        interestAmount,
        apiKey
    })

    await merchant.save()

    return merchant
}

module.exports = {
    createNewCustomer,
    createNewMerchant
}