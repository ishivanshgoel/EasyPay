'use strict';

const merchant = require('./merchant')
const customer = require('./customer')
const auth = require('./auth')

module.exports = function(app) {

    app.get('/', function(req, res, next) {
        res.render('pages/index');
    });

    // ==============
    // auth routes
    // ===============
    app.use("/auth", auth)

    // ==============
    // merchant routes
    // ===============
    app.use("/merchant", merchant)

    // ===============
    // customer routes
    // ===============
    app.use("/customer", customer)

};