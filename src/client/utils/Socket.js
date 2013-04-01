VENUS.Socket = function(){
	this._socket = io.connect("http://localhost");
}

VENUS.Socket.prototype.emit= function(command, data){
	var socket = this._socket;
	socket.emit(command, data);
};

VENUS.Socket.prototype.setCommandCallback = function(command, callback){
	SharedUtil.assert(callback !== undefined && callback !== null);
	var socket = this._socket;
	socket.on(command, callback);
};
