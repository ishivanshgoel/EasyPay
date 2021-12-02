const express = require('express')
const router = express.Router()

router.post('/register/merchant', function(req, res) {
    res.json({
        message: "success"
    })
});

router.post('/register/customer', function(req, res) {
    res.json({
        message: "success"
    })
});

router.post('/login/merchant', function(req, res) {
    res.json({
        message: "success"
    })
});

router.post('/login/customer', function(req, res) {
    res.json({
        message: "success"
    })
});

module.exports = router