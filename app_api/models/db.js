var mongoose = require('mongoose'),
    URI = 'mongodb://holla1144:Declanmcmanus12@ds111622.mlab.com:11622/va-app';

mongoose.Promise = global.Promise;
mongoose.connect(URI);

console.log("Connected to MongoDB at " + URI);

require('./oblast');
require('./rayons');
require('./users');
require('./village');
require('./visit');