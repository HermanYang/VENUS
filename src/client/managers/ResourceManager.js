VENUS.ResourceManager = function() {
	this._socket = new VENUS.Socket();

	this._images = {};
	this._models = {};
	this._shaders = {};

	this._models = {};

	this._requestImagesList = [];
	this._requestModelsList = [];
	this._requestShadersList = [];

	this._defaultShaderProgram = null;

	this._initRequestResourceList();

	this._loadedResources = 0;
	this._interval = 1;
};

VENUS.ResourceManager.prototype.loadResources = function(callback) {
	var socket = this._socket;
	var requestImageList = this._requestImagesList;
	var requestMeshList = this._requestModelsList;
	var requestShaderList = this._requestShadersList;

	var onConnected = function(data) {
		requestList = {
			"image": requestImageList,
			"model": requestMeshList,
			"shader": requestShaderList
		};
		socket.emit(SocketCommandConstants.REQUESTRESOURCES, requestList);
	}
	socket.setCommandCallback(SocketCommandConstants.CONNECT, onConnected);

	var context = this;
	var onResourcesResponed = function(response) {
		for (var responseType in response) {
			switch (responseType) {
			case "image":
				context._loadImages(response[responseType]);
				break;

			case "shader":
				context._loadShaders(response[responseType]);
				break;

			case "model":
				context._loadMeshed(response[responseType]);
				break;
			}

		}
		context._initDefaultShaderProgram();

		var intervalId = setInterval((function(self) {
			return function() {
				if (self._isResourcesLoaded()) {
					callback();
					clearInterval(intervalId);
				}
			}
		})(context), this._interval);
	}
	socket.setCommandCallback(SocketCommandConstants.RESPONSERESOURCES, onResourcesResponed);

	return this;
};

VENUS.ResourceManager.prototype.getImageByPath = function(path) {
	return this._images[path];
};

VENUS.ResourceManager.prototype.getModelByPath = function(path) {
	return this._models[path];
};

VENUS.ResourceManager.prototype.getShaderByPath = function(path) {
	return this._shaders[path];
};

VENUS.ResourceManager.prototype.getDefaultProgram = function() {
	return this._defaultShaderProgram;
};

VENUS.ResourceManager.prototype._initRequestResourceList = function() {
	// define the images to load
	this._requestImagesList.push("/images/crate.gif");

	// define the meshes to load
	this._requestModelsList.push("/models/objs/ch_t.obj");
	this._requestModelsList.push("/models/objs/macbook.obj");

	// define the shaders to load
	this._requestShadersList.push("/shaders/basic/basic.vert");
	this._requestShadersList.push("/shaders/basic/basic.frag");
};

VENUS.ResourceManager.prototype._loadImages = function(imageRawDatas) {
	var images = this._images;
	var requestImageList = this._requestImagesList;
	var context = this;
	for (var key in imageRawDatas) {
		var imgType = VENUS.FileUtil.getFileExtensionByPath(key);
		var loaded = false;
		image = new Image();
		image.onload = function() {
			context._loadedResources += 1;
		};
		image.src = "data:image/" + imgType + ";base64," + imageRawDatas[key];
		images[key] = image;
	}
};

VENUS.ResourceManager.prototype._loadMeshed = function(modelsData) {
	this._models = modelsData;
	this._loadedResources += this._requestModelsList.length;
};

VENUS.ResourceManager.prototype._loadShaders = function(shaderRawDatas) {
	this._shaders = shaderRawDatas;
	this._loadedResources += this._requestShadersList.length;
};

VENUS.ResourceManager.prototype._isResourcesLoaded = function() {
	var requestResourcesAmount = this._requestImagesList.length + this._requestModelsList.length + this._requestShadersList.length;
	if (requestResourcesAmount === this._loadedResources) {
		return true;
	}
	return false;
};

VENUS.ResourceManager.prototype._initDefaultShaderProgram = function() {
	var webglConst = VENUS.Engine.getWebGLConstants();

	var vertexShader = new VENUS.Shader(webglConst.SHADER_TYPE_VERTEX);
	var fragShader = new VENUS.Shader(webglConst.SHADER_TYPE_FRAGMENT);

	this._defaultShaderProgram = new VENUS.Program();

	vertexShader.setShaderSourceCode(this.getShaderByPath("/shaders/basic/basic.vert"));
	vertexShader.compile();

	fragShader.setShaderSourceCode(this.getShaderByPath("/shaders/basic/basic.frag"));
	fragShader.compile();

	this._defaultShaderProgram.attachVertexShader(vertexShader);
	this._defaultShaderProgram.attachFragmentShader(fragShader);

	this._defaultShaderProgram.link();
	this._defaultShaderProgram.bind();
};
