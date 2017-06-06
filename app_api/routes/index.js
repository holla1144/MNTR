var express = require('express'),
    router = express.Router(),
    locationCtrl = require('../controllers/locationCtrl'),
    jwt = require('express-jwt'),
    auth = jwt({
        secret: "thisissecret",
        userProperty: 'payload'
    });
    authCtrl = require('../controllers/authCtrl');


//locations

router.get('/getRayons/:oblastId', locationCtrl.getRayons);

router.get('/getVillages/:rayonId', locationCtrl.getVillages);

router.get('/getOne/:villageId', locationCtrl.getOne);

//visits

router.post('/addVisit', auth, locationCtrl.addVisit);

router.get('/getVisits/:visitIds', auth, locationCtrl.getVisits);

//authentication

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);

module.exports = router;