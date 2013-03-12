var FileSystem = require('fs');
var Log = require('./Logger.js');
var URL = require('url');

var clientdir = '../Client';

function onHttpRequest(request, response) {
	Log.debug('Url request ' + request.url);

	var pathname = URL.parse(request.url).pathname;
	if (pathname == '/') {
		pathname = clientdir + '/Demo.html';
	}
	else {
		pathname = clientdir + pathname;
	}

	FileSystem.exists(pathname, function(exists) {
		if (exists) {
			FileSystem.readFile(pathname, function(err, data) {
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

exports.onHttpRequest = onHttpRequest;