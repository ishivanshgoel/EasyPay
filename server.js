'use strict';

var express = require('express');
var routes = require('./routes/index.js');
var port = process.env.PORT || 3000;

var app = express();

app.use('/public', express.static(process.cwd() + '/public'));
app.set('view engine', 'ejs');


routes(app);

app.listen(port, function() {
    console.log('Server listening on port ' + port + '...');
});