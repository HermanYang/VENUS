var fs = require('fs');
var log = require('./Logger.js');
var url = require('url');

var clientdir = '../Client';
var resdir = '../../res/';

var Server = function() {
	this.app = require('http').createServer(this._onHttpRequest);
	this.io = require('socket.io').listen(this.app);
	this.io.set('log level', 1);
};

Server.prototype.start = function() {
	this.app.listen(8080);
	this.io.sockets.on('connection', this._onSocketsConnection);

	log.info('Venus Server started.')
};

Server.prototype._onHttpRequest = function(request, response) {
	log.debug('Url request ' + request.url);

	var pathname = url.parse(request.url).pathname;
	if (pathname == '/') {
		pathname = clientdir + '/Demo.html';
	}
	else {
		pathname = clientdir + pathname;
	}

	fs.exists(pathname, function(exists) {
		if (exists) {
			fs.readFile(pathname, function(err, data) {
				if (err) {
					response.writeHead(500);
					response.end('File loading error!');
				}
				else {
					response.writeHead(200);
					response.end(data);
				}
			});
		}
		else {
			response.writeHead(404);
			response.end('Page could not found! ' + pathname);
		}
	});
};

Server.prototype._onSocketsConnection = function(socket) {

	socket.on('request resources', function(reslist) {
		var resmap = {};
		for (var i in reslist) {
			var resname = reslist[i];
			var pathname = resdir + resname;
			if (fs.existsSync(pathname)) {
				var data = fs.readFileSync(pathname);
				if (data) {
					log.debug('Resource loaded. ' + pathname);
					resmap[resname] = data;
				}
				else {
					log.error('Resource loading failed! ' + pathname);
				}
			}
			else {
				log.error('Resource not exists! ' + pathname);
			}
		}
		socket.emit('response resources', resmap);
	});
};

module.exports = Server;