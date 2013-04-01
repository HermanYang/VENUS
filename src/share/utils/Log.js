Log = {};

Log.info = function(msg) {
	console.info("info: ", msg);
};

Log.error = function(msg) {
	console.error("error: ", msg);
};

Log.verbose = function(msg) {
	console.log("verbose: ", msg);
};

Log.warn = function(msg) {
	console.warn("warn: ", msg);
};

if ( "undefined" !== typeof module) {
	module.exports = Log;
}
