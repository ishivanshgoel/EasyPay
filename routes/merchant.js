const express = require("express")
const router = express.Router()

const {
    generateNewInvoice,
    pendingCreditsMerchant,
    previousHistory,
    sendReminder,
    deleteInvoice
} = require('../app/http/controllers/merchant')
const {verifyAccessToken} = require('../app/utils/jwt')
const merchant = require('../app/http/middlewares/merchant')

router.get('/', function(req, res, next) {
    try{
        let token = req.query.token
        if(!token) throw new Error('token not found')
        let tokenValid = verifyAccessToken(token)
        if(!tokenValid) throw new Error('invalid token')
        console.log('Token Valid ', tokenValid)
        res.render('pages/merchant', {
            token: token
        });

    } catch(err){
        next(err)
    }
});

router.post('/newinvoice', merchant, async function(req, res, next) {

    console.log('New Invoice ',req.payload)
    let merchantId = req.payload.userId
    console.log('Request Body ', req.body)
    const { customerId, amount, sumary, date} = req.body;
    console.log(customerId, amount, sumary, date)
    try{
        let response = await generateNewInvoice(merchantId, customerId, amount, date, sumary)
        res.json({
            data: response,
            message: "success"
        })
    } catch(err){
        next(err)
    }
});

router.get('/pending', function(req, res, next) {
    try{
        let response = pendingCreditsMerchant(123)
        res.json({
            data: response,
            message: "success"
        })
    } catch(err){
        next(err)
    }
});

router.get('/history', function(req, res, next) {
    try{
        let response = previousHistory(123)
        res.json({
            data: response,
            message: "success"
        })
    } catch(err){
        next(err)
    }
});

router.post('/sendreminder', function(req, res, next) {
    try{
        let response = sendReminder(123, 890, 345)
        res.json({
            data: response,
            message: "success"
        })
    } catch(err){
        next(err)
    }
});

router.delete('/invoice', function(req, res, next){
    try{
        let response = deleteInvoice(123)
        res.json({
            data: response,
            message: "success"
        })
    } catch(err){
        next(err)
    }
})

module.exports = router