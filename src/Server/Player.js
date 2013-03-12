var KeyMap = require('./KeyMap.js');

var Player = function(socket) {
	this.socket = socket;
	this.id = socket.id;

	this.inGame = false;
	this.x = 0;
	this.y = 0;

	// all keys are in release state
	this.keys = {};
	for (var key in KeyMap) {
		this.keys[KeyMap[key]] = false;
	}
};

Player.prototype.setKey = function(keyCode, isDown) {
	var key = KeyMap[keyCode];
	if (key) {
		this.keys[key] = isDown;
	}
};

module.exports = Player;