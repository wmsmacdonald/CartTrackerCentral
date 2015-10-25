function Device(uuid) {
    this.uuid = uuid;
    this.beaconSignalsHistory = [[null,null,null]];

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
        var result = triangulate(beaconSignals[0], beaconSignals[1], beaconSignals[2]);
        this.x = result[0];
        this.y = result[1];
        log("x: " + this.x + " y: " + this.y);
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