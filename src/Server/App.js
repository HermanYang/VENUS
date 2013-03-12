var Resource = require('./Resource.js');
var Http = require('./Http.js');

var server = require('./VenusServer.js');
server.on('request resources', Resource.onClientRequestResources);
server.start(Http.onHttpRequest);


