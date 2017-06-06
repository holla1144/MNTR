/**
 * Created by Master on 30-Apr-17.
 */
var oblast = require('../app_api/models/oblast'),
    mongoose = require('mongoose'),
    oblastData = require('./oblasts.json'),
    URI = 'mongodb://localhost/va-app';


mongoose.connect(URI, function(err) {
    if (err) {
        console.log("Here's your error " + err);
    } else {
        console.log("Connected to the va-app db");
        for (var i = 0; i < oblastData.oblasts.length; i++) {
            var newOblast = new oblast({
                Name: oblastData.oblasts[i].name,
                Admin1: oblastData.oblasts[i].pcode,
            })
            newOblast.save();


            };

        }

    });

