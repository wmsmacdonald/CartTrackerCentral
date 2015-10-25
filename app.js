app = require('express.io')()
app.http().io()

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
})

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
