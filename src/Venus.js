// This file is to define the namespace of the project
VENUS = {};

// define some constants
VENUS.FLOAT_ARRAY = Float32Array;
VENUS.UNSIGNED_INT_ARRAY = Uint16Array;

if ( "undefined" !== typeof module) {
	module.exports = VENUS;
}
