VENUS.ResourceManager = function() {
	this._socket = new VENUS.Socket();

	this._images = {};
	this._models = {};
	this._shaders = {};

	this._models = {};

	this._requestImageList = [];
	this._requestMeshList = [];
	this._requestShaderList = [];

	this._defaultShaderProgram = null;

	this._initRequestResourceList();
};

VENUS.ResourceManager.prototype.loadResources = function(callBack) {
	var socket = this._socket;
	var requestImageList = this._requestImageList;
	var requestMeshList = this._requestMeshList;
	var requestShaderList = this._requestShaderList;

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
		callBack();
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
	this._requestImageList.push("/images/crate.gif");

	// define the meshes to load
	this._requestMeshList.push("/models/objs/ch_t.obj");

	// define the shaders to load
	this._requestShaderList.push("/shaders/basic/basic.vert");
	this._requestShaderList.push("/shaders/basic/basic.frag");
};

VENUS.ResourceManager.prototype._loadImages = function(imageRawDatas) {
	var images = this._images;
	var requestImageList = this._requestImageList;

	for (var key in imageRawDatas) {
		var imgType = VENUS.FileUtil.getFileExtensionByPath(key);
		image = new Image();
		image.src = "data:image/" + imgType + ";base64," + imageRawDatas[key];
		images[key] = image;
	}
};

VENUS.ResourceManager.prototype._loadMeshed = function(modelsData) {
	this._models = modelsData;
};

VENUS.ResourceManager.prototype._loadShaders = function(shaderRawDatas) {
	this._shaders = shaderRawDatas;
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
