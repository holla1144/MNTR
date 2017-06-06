/**
 * Created by Master on 30-Apr-17.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var oblastSchema = new Schema({
    Name: String,
    Admin1: Number
});


module.exports = mongoose.model('oblast', oblastSchema, 'oblasts');