var FileSystem = require('fs');
var Log = require('./Logger.js');

var resdir = '../../res/';

function onClientRequestResources(request) {
	socket = this;
	var response = {};
	for (var reqtype in request) {
		var resmap = {};
		var reslist = request[reqtype];

		for (var i in reslist) {
			var resname = reslist[i];

			var pathname = resdir + resname;

			if (FileSystem.existsSync(pathname)) {
				switch (reqtype) {
					case "Image":
					var data = FileSystem.readFileSync(pathname, "base64");
					break;

					case "Mesh":
					var data = FileSystem.readFileSync(pathname, "utf8");
					break;

					case "Shader":
					var data = FileSystem.readFileSync(pathname, "utf8");
					break;
				}

				if (data) {
					Log.debug('Resource loaded. ' + pathname);
					resmap[resname] = data;
				}
				else {
					Log.error('Resource loading failed! ' + pathname);
				}
			}
			else {
				Log.error('Resource not exists! ' + pathname);
			}
		}
		response[reqtype] = resmap;
	}
	socket.emit('response resources', response);
};

exports.onClientRequestResources = onClientRequestResources;