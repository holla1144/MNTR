/**
 * Created by Master on 30-Apr-17.
 */
var mongoose = require('mongoose'),
    Rayon = require('../app_api/models/rayons'),
    rayons = require('./rayons.json'),
    URI = 'mongodb://localhost/va-app';

mongoose.connect(URI, function() {
    console.log("Connected to " + URI);
    var count = rayons.rayons.length;
    for (i = 0; i < rayons.rayons.length; i++) {
        var rayon = new Rayon({
            Name: rayons.rayons[i].name,
            Admin1: rayons.rayons[i].admin1,
            Admin2: rayons.rayons[i].pcode
        })
        rayon.save(function(err) {
            count -= 1;
            console.log(err);
            console.log("just saved " + rayon);
            console.log("Remaining saves " + count);
            if (count == 0) {
                mongoose.connection.close(function(){console.log("closing db")});
            }
        });
    }
});
