/**
 * Created by Master on 4/2/2017.
 */
var mongoose = require('mongoose'),
    data = require('./data.json'),
    village = require('../app_api/models/village'),
    dbURI = 'mongodb://localhost/va-app';


mongoose.connect(dbURI, function() {
    console.log('db populate working');
})

for (i = 0; i < data.villages.length; i++) {
    var entry = new village({
        Name: data.villages[i].NAME_LAT,
        Admin4: data.villages[i].Admin4,
        Admin2: data.villages[i].Admin2,
        Admin1: data.villages[i].Admin1,
        Population: data.villages[i].POPULATION_EST,
        NameRada: data.villages[i].NAME_RADA_LAT,
        NameObl: data.villages[i].NAME_OBL_LAT,
        loc: {
            type: "Point",
            coordinates: [data.villages[i].POINT_X, data.villages[i].POINT_Y]
        }

    })
    entry.save(function(err) {
        console.log(err);
    })
}