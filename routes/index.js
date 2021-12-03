'use strict';

const merchant = require('./merchant')
const customer = require('./customer')
const auth = require('./auth')

module.exports = function(app) {

    app.get('/', function(req, res, next) {
        res.render('pages/index');
    });

    app.get('/register/merchant', function(req, res, next) {
        res.render('pages/merchantregister');
    });

    app.get('/register/customer', function(req, res, next) {
        res.render('pages/customerregister');
    });

    // ==============
    // auth routes
    // ===============
    app.use("/", auth)

    // ==============
    // merchant routes
    // ===============
    app.use("/merchant", merchant)

    // ===============
    // customer routes
    // ===============
    app.use("/customer", customer)

};