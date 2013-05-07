VENUS.ResourceManager = function() {
	this._socket = new VENUS.Socket();

	this._images = {};
	this._models = {};
	this._shaders = {};
	this._models = {};
	this._programs = {};

	this._requestImagesList = [];
	this._requestModelsList = [];
	this._requestShadersList = [];

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
	return this.getProgramByPath("/shaders/basic");
};

VENUS.ResourceManager.prototype.getProgramByPath = function(path) {
	if (this._programs.hasOwnProperty(path)) {
		return this._programs[path];
	}

	var webglConst = VENUS.Engine.getWebGLConstants();

	var vertexShader = new VENUS.Shader(webglConst.VERTEX_SHADER);
	var fragShader = new VENUS.Shader(webglConst.FRAGMENT_SHADER);

	var program = new VENUS.Program();
	var programName = FileUtil.getFileMainNameByPath(path);

	vertexShader.setShaderSourceCode(this.getShaderByPath(path + "/" + programName + ".vert"));
	vertexShader.compile();

	fragShader.setShaderSourceCode(this.getShaderByPath(path + "/" + programName + ".frag"));
	fragShader.compile();

	program.attachVertexShader(vertexShader);
	program.attachFragmentShader(fragShader);

	program.link();

	this._programs[path] = program;

	return program;
};

VENUS.ResourceManager.prototype._initRequestResourceList = function() {
	// define the images to load
	this._requestImagesList.push("/images/moon.jpg");
	this._requestImagesList.push("/images/spark.png");
	this._requestImagesList.push("/images/metal.jpg");

	this._requestImagesList.push("/images/skybox/universe/px.jpg");
	this._requestImagesList.push("/images/skybox/universe/nx.jpg");
	this._requestImagesList.push("/images/skybox/universe/py.jpg");
	this._requestImagesList.push("/images/skybox/universe/ny.jpg");
	this._requestImagesList.push("/images/skybox/universe/pz.jpg");
	this._requestImagesList.push("/images/skybox/universe/nz.jpg");

	// define the meshes to load
	this._requestModelsList.push("/models/objs/cf1.obj");

	// define the shaders to load
	this._requestShadersList.push("/shaders/basic/basic.vert");
	this._requestShadersList.push("/shaders/basic/basic.frag");

	this._requestShadersList.push("/shaders/particle/particle.vert");
	this._requestShadersList.push("/shaders/particle/particle.frag");
	
	this._requestShadersList.push("/shaders/billboard/billboard.vert");
	this._requestShadersList.push("/shaders/billboard/billboard.frag");
};

VENUS.ResourceManager.prototype._loadImages = function(imageRawDatas) {
	var images = this._images;
	var requestImageList = this._requestImagesList;
	var context = this;
	for (var key in imageRawDatas) {
		var imgType = FileUtil.getFileExtensionByPath(key);
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
