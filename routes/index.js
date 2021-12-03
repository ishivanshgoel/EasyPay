'use strict';

const merchant = require('./merchant')
const customer = require('./customer')
const auth = require('./auth')

module.exports = function(app) {

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