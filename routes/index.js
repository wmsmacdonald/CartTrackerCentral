var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/signalstrengths', function(req, res, next) {
    var timestamp = new Date();
    var beaconId = req.query.beaconid;
    var uuid = req.query.uuid;
    var signalStrength = req.query.signalStrength;


});


module.exports = router;
