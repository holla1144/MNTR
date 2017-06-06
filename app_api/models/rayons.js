/**
 * Created by Master on 30-Apr-17.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var rayonSchema = new Schema({
    Name: String,
    Admin2: Number,
    Admin1: Number
});

module.exports = mongoose.model('rayon', rayonSchema, 'rayons');