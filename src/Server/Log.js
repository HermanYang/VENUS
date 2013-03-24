Log = {};

Log.info = function(msg) {
	console.log("info: ", msg);
};

Log.debug = function(msg) {
	console.log("debug: ", msg);
};

Log.error = function(msg) {
	console.log("error: ", msg);
};

Log.verbose = function(msg) {
	console.log("verbose: ", msg);
};

module.exports = Log;
