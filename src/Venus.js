// This file is to define the namespace of the project
VENUS = {};

// define some constants
VENUS.FLOAT_ARRAY = Float32Array;
VENUS.UNSIGNED_INT_ARRAY = Uint16Array;

VENUS.TYPE_LIGHT_DIRECTION = 0;
VENUS.TYPE_LIGHT_POINT = 1;
VENUS.TYPE_LIGHT_SPOT = 2;

VENUS.MAX_DIRECTION_LIGHT_AMOUNT = 10;
VENUS.MAX_POINT_LIGHT_AMOUNT = 10;
VENUS.MAX_SPOT_LIGHT_AMOUNT = 10;

if ("undefined" !== typeof module) {
	module.exports = VENUS;
}

