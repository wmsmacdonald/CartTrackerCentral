function Device(uuid) {
    this.uuid = uuid;
    this.beaconSignalsHistory = [[-50,-60,-70]];

    this.addBeaconSignal = function(beaconId, signalStrength) {
        log("New signalStrength from Beacon " + beaconId + " with strength " + signalStrength);
        var beaconSignals = this.beaconSignalsHistory[this.beaconSignalsHistory.length - 1];
        beaconSignals[beaconId] = signalStrength;

        this.beaconSignalsHistory.push(beaconSignals);
    },
    this.x = null;
    this.y = null;
    this.updateCoordinates = function() {
        var beaconSignals = this.beaconSignalsHistory[this.beaconSignalsHistory.length - 1];
        $.ajax({
            url: 'triangulate?r1='+beaconSignals[0]+'&r2='+beaconSignals[1]+'&r3='+beaconSignals[2],
            success: function(data) {
                data = JSON.parse(data);
                this.x = data.x;
                this.y = data.y;
                console.log(this.x);
                log("x: " + this.x + " y: " + this.y);
            }
        });
    }
}

var coordinateSystem = {

    devices: [],

    addDevice: function(uuid) {
        var device = new Device(uuid);
        this.devices.push(device);
        return device;
    },

    removeDevice: function(uuid) {
        for(var i = 0; i < devices.length; i++) {
            if( this.devices[i].uuid == uuid) {
                this.devices.splice(i, 1);
                log("Device " + uuid + " removed.");
                return true;
            }
        }
        log("Removing device: device not found.");
        return false;
    },

    getDevice: function(uuid) {
        for(var i = 0; i < this.devices.length; i++) {
            if( this.devices[i].uuid == uuid) {
                return this.devices[i];
            }
        }
        return false;
    },


    addSignalStrength: function(beaconId, uuid, signalStrength) {

        var device = this.getDevice(uuid);
        if (!device) {
            log("Adding device " + uuid + ".");
            device = this.addDevice(uuid);
        }

        device.addBeaconSignal(beaconId, signalStrength);

        device.updateCoordinates();
        //this.updateDeviceOnGraph(uuid);
    },

};

function log(text) {
    $('#log').append("<p>"+text+"</p>");
}