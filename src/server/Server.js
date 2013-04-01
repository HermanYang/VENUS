ServerUtil = module.require("./utils/ServerUtil.js");
Log = module.require("../share/utils/Log.js");
SocketsServer = module.require("./SocketsServer.js");

Server = function() {
	this._port = 80;
	this._server = module.require("http").createServer(this._onHttpRequest);
	this._socketServer = new SocketsServer(this._server);
};

Server.prototype.start = function(port) {
	if (port !== undefined) {
		this._port = port;
		this._server.listen(this._port);
		this._socketServer.start();
	}
};

Server.prototype.addCommandHander = function(command, hander) {
	this._socketServer.addCommandHander(command, hander);
};

Server.prototype._onHttpRequest = function(request, response) {
	var serverUtil = ServerUtil.getInstance();
	var urlUtil = serverUtil.getUrlUtil();
	var fsManager = serverUtil.getFileSystemManager();

	var urlInfo = urlUtil.parse(request.url);

	var pathname = urlInfo.pathname;
	Log.info("request " + pathname);

	if (pathname == "/") {
		pathname = serverUtil.getRootPath() + "/index.html";
	}
	else {
		pathname = serverUtil.getRootPath() + pathname;
	}

	fsManager.exists(pathname, function(exists) {
		if (exists) {
			fsManager.readFile(pathname, function(err, data) {
				if (err) {
					response.writeHead(500);
					response.end("File loading error");
				}
				else {
					var responseHead = serverUtil.getHttpHeadMessage(pathname);
					response.writeHead(200, responseHead);
					response.end(data);

					Log.info(pathname + " is loaded");
				}
			});
		}
		else {
			response.writeHead(404);
			response.end("Page could not found " + pathname);

			Log.error(pathname + " does not exists");
		}
	});
};

module.exports = Server;

