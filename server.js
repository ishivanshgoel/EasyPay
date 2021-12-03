'use strict';

const express = require('express');
const routes = require('./routes/index.js');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
require('dotenv').config()
require('./app/config/db')()

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/public', express.static(process.cwd() + '/public'));
app.set('view engine', 'ejs');

routes(app);

app.listen(port, function() {
    console.log('Server listening on port ' + port + '...');
});