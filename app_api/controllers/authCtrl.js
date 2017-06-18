var passport = require('passport'),
    mongoose = require('mongoose'),
    nodemailer = require('nodemailer'),
    xoauth2 = require('xoauth2'),
    User = require('../models/users');

var sendJsonResponse = function(res, status, content) {
        res.status(status);
        res.json(content);
};

module.exports.register = function(req, res) {

        console.log(process.env.emailPassword);
        console.log(process.env.secret);

        let email = req.body.email;
        if (!req.body.name || !req.body.email || !req.body.password) {
            sendJsonResponse(res, 400, {
                "message": "All fields required"
            });
            return } else {

                let query = User.findOne({email: req.body.email});

                query.exec(function(err, data) {

                    if (err) {
                        sendJsonResponse(res, 401, {
                            "message": err
                        })

                    } else if (data && data.status == "verified") {
                        sendJsonResponse(res, 401, {
                            "message": "This email has already been registered. " +
                            "Please log in or use a different email."
                        })

                    } else {

                        //create the transporter for sending verification email
                        let transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 465,
                            secure: true, // use SSL
                            auth: {
                                user: 'GETMNTR@gmail.com',
                                pass: process.env.emailPassword
                            }
                        });


                        // set up e-mail data

                        let today = new Date();

                        let expDate = today.setDate(today.getDate() + 1) / 1000; //number of seconds since start of the unix era, + 1 day

                        let userObj = {
                            'email': req.body.email,
                            'name': req.body.name,
                            'token': expDate
                        };

                        let stringObj = encodeURIComponent(JSON.stringify(userObj));


                        let mailOptions = {
                            from: '"MNTR" <GETMNTR@gmail.com>',
                            to: req.body.email,
                            subject: 'Welcome to MNTR', // Subject line
                            text: 'Welcome to MNTR ', // plaintext body
                            html: '<b>Welcome to MNTR</b><br><p>Click on "verify" to activate your account</p><br><a href="http://www.getmntr.com/#!/verify/?dataObj=' + stringObj + '"  >Verify</a>' // html body
                        };

                        let user = new User();

                        user.name = req.body.name;
                        user.email = req.body.email;
                        user.status = "unverified";
                        user.setPassword(req.body.password);

                        user.save(function() {

                            transporter.sendMail(mailOptions, function(error, info){
                                if(err){
                                    sendJsonResponse(res, 400, {
                                        "message": "There was an error " + err,
                                    })
                                } else {
                                    sendJsonResponse(res, 200, {
                                        "message": "An email has been sent to your account"
                                    })
                                }
                            });

                        }, function(err) {
                            sendJsonResponse(res, 401, err)
                        })
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
        let token;

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
};

module.exports.verify = function(req, res) {

    let obj = req.params.dataObj;

    let userInfo = JSON.parse(obj);

    let today = new Date();

    let todaySeconds = today.getTime();

    if (userInfo.token > todaySeconds) {

        User.remove( {email: userInfo.email }, function(err, docs) {
            if (err) {
                console.log("Couldn't delete " + userInfo.email + "from Users collection");
            } else {

                console.log(userInfo.email + " succesfully removed from Users collection");

                sendJsonResponse(res, 401, {
                    "message": "Looks like your link expired. Try registering again."
                });
            }
        });

    } else {
           User.findOne( {email: userInfo.email }, function(err, docs) {

                if (err) {
                    sendJsonResponse(res, 400, {
                        "message":"something went wrong " + err,
                    })

                } else if (docs.status == 'verified') {
                    sendJsonResponse(res, 401, {
                        "message": "Looks like this account has already been verified. Try logging in."
                    });

                } else {

                    docs.update( {$set: {'status': "verified"} }, function(err) {

                       let token = docs.generateJwt();

                       sendJsonResponse(res, 200, {
                           token: token
                       });
                    }, function(err) {
                        sendJsonResponse(res, 400, {
                            "message": "Sorry, there was an authentication error"
                        })
                    });
                }
            })
    }

};