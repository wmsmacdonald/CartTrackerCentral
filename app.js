app = require('express.io')()
app.require
app.http().io()

var lateration = require("lateration");
var Circle = lateration.Circle;
var Vector = lateration.Vector;
var laterate = lateration.laterate;

var xa = 1, ya = -1;
var xb = 2, yb = 1;
var xc = -3, yc = 4;


function triangulate(r1, r2, r3) {

    var d1 = Math.pow(10, (-r1 + 40)/114);
    var d2 = Math.pow(10, (-r2 + 40)/114);
    var d3 = Math.pow(10, (-r3 + 40)/114);

    // The beacons
    const beacons = [
        new Circle(new Vector(xa, ya), d1),
        new Circle(new Vector(xb, yb), d2),
        new Circle(new Vector(xc, yc), d3)
    ];

    // Laterating
    const position = laterate(beacons);
    return position;

}

// Setup the ready route, and emit talk event.
/*app.io.route('ready', function(req) {
    req.io.emit('talk', { 
        message: 'io event from an io route on the server'
    })
})*/

// Send the client html.
app.get('/', function(req, res) { 
    res.sendfile(__dirname + '/client.html')
})

app.get('/connection.js', function(req, res) {
    res.sendfile(__dirname + '/connection.js')
})

app.get('/coordinates.js', function(req, res) {
    res.sendfile(__dirname + '/coordinates.js')
});

app.get('/triangle.js', function(req, res) {
    res.sendfile(__dirname + '/triangle.js')
});

app.get('/triangulate', function(req, res) {
    var r1 = req.query.r1;
    var r2 = req.query.r2;
    var r3 = req.query.r3;
    var result = triangulate(r1, r2, r3);
    console.log(result);
    res.send(JSON.stringify(result));

});

/*app.io.route('ready', function(socket_req) {
    socket_req.io.emit('talk', {
        message: 'hello'
    });
});*/

app.io.route('ready', function(socket_req) {
    app.get('/api', function (req, res) {
        var beaconId = req.query.beaconid;
        console.log(beaconId);
        var uuid = req.query.uuid;
        var signalStrength = req.query.signalstrength;

        socket_req.io.emit('signalstrength', {
            beaconId: beaconId,
            uuid: uuid,
            signalStrength: signalStrength
        });
        res.end('success');
    });
});

app.listen(3000)
