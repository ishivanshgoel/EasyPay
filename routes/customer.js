const express = require('express')
const router = express.Router()

const {
    pendingCredits,
    paidHistory,
    pay,
    getCustomer
}  = require('../app/http/controllers/customer')
const {verifyAccessToken} = require('../app/utils/jwt')
const customer = require('../app/http/middlewares/customer')

router.get('/', async function(req, res, next) {

    try{
        let token = req.query.token
        if(!token) throw new Error('token not found')
        let tokenValid = verifyAccessToken(token)
        if(!tokenValid) throw new Error('invalid token')
        console.log('Token Valid ', tokenValid)
        let customer = await getCustomer(tokenValid.userId)
        res.render('pages/customer', {
            token: token,
            customer: customer
        });

    } catch(err){
        next(err)
    }

});

router.get('/pending', customer, async function(req, res, next) {

    try{
        let customerId = req.payload.userId
        let pending = await pendingCredits(customerId);
        res.json({
            data: pending,
            message: "success"
        })
    } catch(err){
        next(err)
    }
    
});

router.get('/paid', customer, async function(req, res, next) {

    try{
        let customerId = req.payload.userId
        let paid = await paidHistory(customerId);
        res.json({
            data: paid,
            message: "success"
        })
    } catch(err){
        next(err)
    }
    
});

module.exports = router