var passport = require('passport'),
    mongoose = require('mongoose'),
    User = require('../models/users')

var sendJsonResponse = function(res, status, content) {
        res.status(status);
        res.json(content);
};

module.exports.register = function(req, res) {

        if (!req.body.name || !req.body.email || !req.body.password) {
            sendJsonResponse(res, 400, {
                "message": "All fields required"
            });
            return } else {

                let query = User.findOne({email: req.body.email}).count();

                query.exec(function(err, data) {

                    if (err) {
                        sendJsonResponse(res, 401, {
                            "message": err
                        })

                    } else if (data > 0) {
                        sendJsonResponse(res, 401, {
                            "message": "This email has already been registered. " +
                            "Please log in or use a different email."
                        })

                    } else {

                        var user = new User();

                        user.name = req.body.name;
                        user.email = req.body.email;
                        user.setPassword(req.body.password);

                        user.save(function () {
                            var token;
                            token = user.generateJwt();
                            sendJsonResponse(res, 200, {
                                "token": token
                            })
                        }, function (err) {
                            sendJsonResponse(res, 401, err);
                        });
                    }
            });
        }};



module.exports.login = function(req, res) {

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