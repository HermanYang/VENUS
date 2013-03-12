var Log = require('./Logger.js');
var Player = require('./Player.js');

var app = undefined
var io = undefined;
var port = 8080;

var listeners = {};
var players = {};
var timers = {};

// param onHttprequest: function(resquest, response)
function start(onHttpRequest) {
	app = require('http').createServer(onHttpRequest);
	io = require('socket.io').listen(app);
	io.sockets.on('connection', _onSocketsConnection);
	io.set('log level', 1);
	app.listen(port);
	Log.info('Venus Server started.');
};

// param callback: function(deltaTime)
function startTimer(callback, interval) {
	var timer = {
		'callback':callback,
		'interval':interval, 
		'lastTime':(new Date()).getTime()
	};
	var token = setInterval(_run, interval, timer);
	timer.token = token;
	timers[callback] = timer;
};

function stopTimer(callback) {
	var timer = timers[callback];
	clearInterval(timer.token);
	delete timers[callback];
};

function getPlayer(socketId) {
	return players[socketId];
};

// param: (protocal, [arg1], [arg2]..)
function broadcast() {
	io.sockets.emit.apply(io.sockets, arguments);
};

function on(protocal, func) {
	listeners[protocal] = func;
};

function _onSocketsConnection(socket) {
	var player = new Player(socket);
	players[player.id] = player;
	for (var protocal in listeners) {
		socket.on(protocal, listeners[protocal]);
	}
	socket.on('disconnect', _onClientDisconnect);
	Log.debug('new player:' + player.id);
};

function _onClientDisconnect() {
	player = players[this.id];
	delete players[this.id];
	Log.debug('player:' + player.id + ' disconnect.');
};

function _run(timer) {
	var date = new Date();
	var now = date.getTime();
	var delta = now - timer.lastTime;
	timer.callback(delta);
	timer.lastTime = now;
};

exports.start = start;
exports.getPlayer = getPlayer;
exports.players = players;
exports.broadcast = broadcast;
exports.on = on;
exports.startTimer = startTimer;
exports.stopTimer = stopTimer;

