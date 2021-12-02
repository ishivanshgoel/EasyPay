const express = require('express')
const router = express.Router()

const {
    pendingCredits,
    paidHistory,
    pay
}  = require('../app/http/controllers/customer')

router.get('/', function(req, res) {
    res.render('pages/customer');
});

router.get('/pending', function(req, res) {

    try{
        let pending = pendingCredits(99988);
        res.json({
            data: pending,
            message: "success"
        })
    } catch(err){
        next(err)
    }
    
});

router.get('/paid', function(req, res) {

    try{
        let paid = paidHistory(99988);
        res.json({
            data: paid,
            message: "success"
        })
    } catch(err){
        next(err)
    }
    
});

module.exports = router