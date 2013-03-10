VENUS.ResourceManager = function() {
	this._instance = null;
	this.images = ["crate.gif", "b.jpg"];
	this.models = [];
	this.shaders = [];
};

VENUS.ResourceManager.getInstance = function() {
	if (this._instance == null) {
		this._instance = new VENUS.ResourceManager();
	}
	return this._instance;
};

VENUS.ResourceManager.prototype.loadResources = function(callBack) {
	this._loadImages();

	this._loadModels();

	this._loadShaders();

	/*var intervalFunction = function() {
		if (checkLoadingProgress()) {
			if (callBack !== undefined && callBack instanceof function) {
				callBack();
				return true;
			}
		}
		return false;
	};

	var intervalId = setInterval("if(intervalFunction()){clearInterval(intervalId);}", 1000);*/

	return this;
};

VENUS.ResourceManager.prototype._loadImages = function(name) {
	var socket = io.connect("http://localhost");
	var images = this.images;
	var requestList = [];
	for (var i in images) {
		requestList.push("Images/" + images[i]);
	}

	socket.on("connect", function(data) {
		console.info(data);
		socket.emit("request resources", requestList);
	});

	socket.on("response resources", function(data) {
		 console.log(data);
	});
};

VENUS.ResourceManager.prototype._loadModels = function(name) {

};

VENUS.ResourceManager.prototype._loadShaders = function(name) {

};

VENUS.ResourceManager.prototype._checkLoadingProgress = function() {
	for (var image in this.images) {
		if (img.isReady == false) {
			return false;
		}
	}

	for (var model in this.models) {
		if (model.isReady == false) {
			return false;
		}
	}

	for (var shader in this.shaders) {
		if (shader.isReady == false) {
			return false;
		}
	}

	return true;
};

