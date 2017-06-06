var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var villageSchema = new Schema({

    Name: {
        type: String,
        required: true
    },

    Admin4: {
        type: Number,
        required: true
    },

    Admin2: {
        type: Number,
        required: true
    },

    Admin1: {
        type: Number,
        required: true
    },

    Population: Number,

    NameRada: String,

    NameObl: String,

    loc: {type: {type: String}, coordinates: [Number]},

    visits: Array


});


module.exports = mongoose.model('village', villageSchema, 'villages');