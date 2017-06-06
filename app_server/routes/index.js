/**
 * Created by Master on 29-Apr-17.
 */

var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    res.send("you're home");
})

router.get('/villages', function(req, res) {
    res.send("you're looking at villages");
})

module.exports = router;