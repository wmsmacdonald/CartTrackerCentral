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