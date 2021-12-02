'use strict';

const merchant = require('./merchant')
const customer = require('./customer')

module.exports = function(app) {

    app.get('/', function(req, res, next) {
        res.render('pages/index');
    });

    // ==============
    // merchant routes
    // ===============
    app.use("/merchant", merchant)

    // ===============
    // customer routes
    // ===============
    app.use("/customer", customer)

};