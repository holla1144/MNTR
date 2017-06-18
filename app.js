/**
 * Created by Master on 4/2/2017.
 */

require('dotenv').config();
var express = require('express'),
    path = require('path'),
    app = express(),
    bodyParser = require('body-parser'),
    routesApi = require('./app_api/routes/index'),
    passport = require('passport'),
    port = process.env.PORT || 4200;

require('./app_api/config/passport');
require('./app_api/models/db');

console.log(process.env.emailPassword);
console.log(process.env.secret);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

app.use(bodyParser.json());

app.use(passport.initialize());

app.use(function(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401);
        res.json({"message": err.name + ": " + err.message});
    }
});

app.use('/api', routesApi);

app.use(function(req, res) {
    res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});



app.listen(port, function() {
    console.log("va-app listening on port" + " " + port);
});
