/**
 * Created by Master on 4/2/2017.
 */
var mongoose = require('mongoose'),
    dbUri = 'mongodb://localhost/va-app',
    village = require('../app_api/models/village');

var getVillage = function(req, res) {
    mongoose.connect(dbUri, function () {
        console.log("Connected to mongodb")
    });
    village.findOne({"NAME_OBL_LAT":"Luhanska"}, function(err, village) {
        if (err) {
            console.log(err);
        } else {
            console.log(village);
            res.json(village);
        }
    })



}
module.exports = getVillage;