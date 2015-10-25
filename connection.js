io = io.connect()

// Emit ready event.
io.emit('ready')

// Listen for the talk event.
io.on('signalstrength', function(data) {

    coordinateSystem.addSignalStrength(data.beaconId, data.uuid, data.signalStrength);
    console.log(coordinateSystem.devices);
    //console.log(data);
    //alert(data);
});

//$(document).ready(function() {


    /*socket.on('add', function(beaconId, uuid, signalStrength){
        coordinateSystem.addSignalStrength(beaconId, uuid, signalStrength);
    });*/

    /*socket.on('remove', function(uuid){
        coordinateSystem.removeDevice(uuid);
    });*/
//});