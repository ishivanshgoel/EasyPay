const express = require("express")
const router = express.Router()

const {
    generateNewInvoice,
    pendingCreditsMerchant,
    previousHistory,
    sendReminder,
    deleteInvoice
} = require('../app/http/controllers/merchant')

router.get('/', function(req, res, next) {
    res.render('pages/merchant');
});

router.post('/newinvoice', function(req, res, next) {
    try{
        let response = generateNewInvoice(123, 50, '12/12/2020')
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

router.post('/sendinvoice', function(req, res, next) {
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