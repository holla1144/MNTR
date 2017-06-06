/*
This controller returns all the documents from the oblasts collection in the va-app db
 */

var mongoose = require('mongoose'),
    Oblast = require('../models/oblast'),
    URI = 'mongodb://localhost/va-app';

module.exports = function() {

    var query = Oblast.find();

    mongoose.Promise = global.Promise;

    mongoose.connect(URI, function() {
        console.log("getOblasts controller connected to va-app DB");
    });

    query.exec(function(err, oblasts) {
        if (err) {
            console.log(err);
        } else if (!oblasts){
            console.log("Couldn't retrieve oblasts");
        } else {
            console.log(oblasts);
        }
    })

};