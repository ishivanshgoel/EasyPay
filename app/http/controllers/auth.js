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

const verifyCustomer = async (email, password)=>{

    let customer = await Customer.findOne({ email }).exec()

    if(customer.password == password){
        customer["status"] = "success"
        return customer
    } else return {
        message: "invalid"
    }

}

const verifyMerchant = async(email, password)=>{

    let merchant = await Merchant.findOne({ email }).exec()

    if(merchant.password == password){
        merchant["status"] = "success"
        return merchant
    } else return {
        message: "invalid"
    }

}

module.exports = {
    createNewCustomer,
    createNewMerchant,
    verifyCustomer,
    verifyMerchant
}