var passport = require('passport'),
    mongoose = require('mongoose'),
    URI = 'mongodb://localhost/va-app',
    User = require('../models/users')

var sendJsonResponse = function(res, status, content) {
        res.status(status);
        res.json(content);
};

module.exports.register = function(req, res) {

    console.log(req);

    if (!req.body.name || !req.body.email || !req.body.password) {
        sendJsonResponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    user.save(function(err) {
        var token;
        token = user.generateJwt();
        sendJsonResponse(res, 200, {
            "token": token
        })
    });


};

module.exports.login = function(req, res) {

    console.log(req.body);

    if(!req.body.email || !req.body.password) {
        sendJsonResponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    passport.authenticate('local', function(err, user, info) {
        var token;

        if (err) {
            sendJsonResponse(res, 404, err);
            return;
        }

        if (user) {
            token = user.generateJwt();
            sendJsonResponse(res, 200, {
                "token": token
            });
        } else {
            sendJsonResponse(res, 401, info);
        }
    }) (req, res);
}