function Device(uuid) {
    this.uuid = uuid,
    this.signalStrengths = []
}

function Coordinates(x, y) {
    this.x = x,
    this.y = y
}

var coordinateSystem = {

    devices: [],
    beacons: [],

    addDevice: function(uuid) {
        var device = new Device(uuid);
        this.devices.push(device);
        return device;
    },

    removeDevice: function(uuid) {
        for(var i = 0; i < devices.length; i++) {
            if( this.devices[i].uuid == uuid) {
                this.devices.splice(i, 1);
                return true;
            }
        }
        false;
    },

    getDevice: function(uuid) {
        for(var i = 0; i < devices.length; i++) {
            if( this.devices[i].uuid == uuid) {
                return this.devices[i];
            }
        }
        return false;
    },


    addSignalStrength: function(connected, timestamp, beaconId, uuid, signalStrength) {
        if (!connected) {
            console.log("Device " + uuid + " removed.");
            this.removeDevice(uuid);
        }

        var device = this.getDevice(uuid);
        if (!device) {
            device = this.addDevice(uuid);
        }

        device.signalStrenths[beaconId] = signalStrength;

        this.updateCoordinates(uuid);
        this.updateDeviceOnGraph(uuid);
    },

}

function log(text) {
    $('log').append(text);
}