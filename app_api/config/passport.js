var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var URI = 'mongodb://localhost/va-app';
var User = require('../models/users');

passport.use(new LocalStrategy({
    usernameField: 'email'
    },

     function(username, password, done) {
        mongoose.connect(URI, function() {

        User.findOne({email: username}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect Username'
                });
            }
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                })
            }
            return done(null, user);
        })
        })
    }));