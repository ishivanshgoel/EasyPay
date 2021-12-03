const express = require('express')
const router = express.Router()
const {
    createNewCustomer,
    createNewMerchant,
    verifyCustomer,
    verifyMerchant
} = require('../app/http/controllers/auth')

// render homepage
router.get('/', function(req, res, next) {
    res.render('pages/index');
});

// send merchant registeration page
router.get('/register/merchant', function(req, res, next) {
    res.render('pages/merchantregister');
});

// send customer registeration page
router.get('/register/customer', function(req, res, next) {
    res.render('pages/customerregister');
});

// register new merchant
router.post('/register/merchant', async function(req, res, next) {
    try{
        console.log('Merchant Register ', req.body)
        let { email, password, name, address, interestAmount, apiKey } = req.body;
        if(!email || !password || !name || !address || !interestAmount || !apiKey) throw new Error('All fields are required')

        let response = await createNewMerchant(email, password, name, address, interestAmount, apiKey)

        res.json({
            message: "success",
            data: response
        })

    } catch(err){
        next(err)
    }
});

// register new customer
router.post('/register/customer', async function(req, res, next) {
    console.log('Customer Register ', req.body)
    try{
        let {email, password, name, phoneNumber} = req.body;
        if(!email || !password || !name || !phoneNumber) throw new Error('All fields are required')

        let response = await createNewCustomer(email, password, name, phoneNumber)

        res.json({
            message: "success",
            data: response
        })

    } catch(err){
        next(err)
    }
    
});

// login merchant page
router.get('/login/merchant', function(req, res, next) {
    res.render('pages/merchantlogin');
});

// login customer page
router.get('/login/customer', function(req, res, next) {
    res.render('pages/customerlogin');
});

// register new merchant
router.post('/login/merchant', async function(req, res, next) {

    try{

        let {email, password} = req.body;
        if(!email || !password) throw new Error('Parameters not found!')
        
        let response = await verifyMerchant(email, password)
        console.log('Repsonse ', response)
        if(response.status == "success"){
            res.redirect("/merchant")
        } else throw new Error('Invalid Credentials')

    } catch(err){
        next(err)
    }

});

// register new customer
router.post('/login/customer', async function(req, res, next) {

    try{
        let {email, password} = req.body;
        if(!email || !password) throw new Error('Parameters not found!')
        
        let response = await verifyCustomer(email, password)
        if(response.status == "success"){
            res.redirect("/customer")
        } else throw new Error('Invalid Credentials')
    } catch(err){
        next(err)
    }

});

module.exports = router