const express = require("express")
const router = express.Router()

const {
    generateNewInvoice,
    pendingCreditsMerchant,
    previousHistory,
    sendReminder,
    deleteInvoice,
    getMerchant
} = require('../app/http/controllers/merchant')
const {verifyAccessToken} = require('../app/utils/jwt')
const merchant = require('../app/http/middlewares/merchant')

router.get('/', async function(req, res, next) {
    try{
        let token = req.query.token
        if(!token) throw new Error('token not found')
        let tokenValid = verifyAccessToken(token)
        if(!tokenValid) throw new Error('invalid token')
        console.log('Token Valid ', tokenValid)
        let merchant = await getMerchant(tokenValid.userId)
        res.render('pages/merchant', {
            token: token,
            merchant: merchant
        });

    } catch(err){
        next(err)
    }
});

router.post('/newinvoice', merchant, async function(req, res, next) {

    console.log('New Invoice ',req.payload)
    let merchantId = req.payload.userId
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

router.get('/pending', merchant, async function(req, res, next) {
    try{
        
        let merchantId = req.payload.userId
        let response = await pendingCreditsMerchant(merchantId)
        res.json({
            data: response,
            message: "success"
        })
    } catch(err){
        next(err)
    }
});

router.get('/history', merchant, async function(req, res, next) {
    try{
        let merchantId = req.payload.userId
        let response = await previousHistory(merchantId)
        res.json({
            data: response,
            message: "success"
        })
    } catch(err){
        next(err)
    }
});

router.post('/getInfo', async function(req, res, next){
    try{
        let {merchantId} = req.body;
        console.log('Merchant Id ', merchantId)
        let merchant = await getMerchant(merchantId)
        res.json({
            data: merchant
        })
    } catch(err){
        next(err)
    }
})

router.post('/sendreminder', merchant, async function(req, res, next) {
    try{
        let response = await sendReminder(123, 890, 345)
        res.json({
            data: response,
            message: "success"
        })
    } catch(err){
        next(err)
    }
});

router.delete('/invoice', async function(req, res, next){
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