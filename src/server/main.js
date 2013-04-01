Log = module.require("../share/utils/Log.js");
Server = module.require("./Server.js");
ServerUtil = module.require("./utils/ServerUtil.js");
SocketCommandConstants = module.require("../share/constants/SocketCommandConstants.js");

var handler = function(socket, request) {
	serverUtil = new ServerUtil();
	var resdir = serverUtil.getResourcePath();
	var serverUtil = ServerUtil.getInstance();
	var fsManager = serverUtil.getFileSystemManager();

	var response = {};

	for (var reqtype in request) {
		var resmap = {};
		var reslist = request[reqtype];

		for (var i in reslist) {
			var resname = reslist[i];

			var pathname = resdir + resname;

			if (fsManager.existsSync(pathname)) {
				switch (reqtype) {
				case "image":
					var data = fsManager.readFileSync(pathname, "base64");
					break;

				case "model":
					var fileName = serverUtil.getFileMainNameByPath(pathname);
					var extension = ".js";
					var pathname = resdir + "/models/gen/" + fileName + extension;
					var data = fsManager.readFileSync(pathname, "utf8");
					data = JSON.parse(data);
					break;

				case "shader":
					var data = fsManager.readFileSync(pathname, "utf8");
					break;
				}

				if (data) {
					Log.info('Resource loaded. ' + pathname);
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
var server = new Server();
server.addCommandHander(SocketCommandConstants.REQUESTRESOURCES, handler);

server.start(8080);
