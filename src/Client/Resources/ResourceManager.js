VENUS.ResourceManager = function() {
	this._images = {};
	this._meshes = {};
	this._shaders = {};

	this._requestImageList = [];
	this._requestMeshList = [];
	this._requestShaderList = [];

	this._defaultShaderProgram = null;

	this._initRequestResourceList();
};

VENUS.ResourceManager.prototype.loadResources = function(callBack) {
	var socket = io.connect("http://localhost");
	var requestImageList = this._requestImageList;
	var requestMeshList = this._requestMeshList;
	var requestShaderList = this._requestShaderList;

	var onConnected = function(data) {
		requestList = {
			"Image": requestImageList,
			"Mesh": requestMeshList,
			"Shader": requestShaderList
		};

		socket.emit("request resources", requestList);
	}
	var context = this;
	var onResourcesResponed = function(response) {
		for (var responseType in response) {
			switch (responseType) {
			case "Image":
				context._loadImages(response[responseType]);
				break;

			case "Shader":
				context._loadShaders(response[responseType]);
				break;

			case "Mesh":
				context._loadMeshed(response[responseType]);
				break;
			}

		}
		context._initDefaultShaderProgram();
		callBack();
	}
	socket.on("connect", onConnected);

	socket.on("response resources", onResourcesResponed);

	return this;
};

VENUS.ResourceManager.prototype.getImageByPath = function(imgPath) {
	return this._images[imgPath];
};

VENUS.ResourceManager.prototype.getMeshByPath = function(imgPath) {
	return this._meshes[imgPath];
};

VENUS.ResourceManager.prototype.getShaderByPath = function(imgPath) {
	return this._shaders[imgPath];
};

VENUS.ResourceManager.prototype.getDefaultProgram = function(imgPath) {
	return this._defaultShaderProgram;
};

VENUS.ResourceManager.prototype._initRequestResourceList = function() {
	// define the images to preload
	this._requestImageList.push("./Images/crate.gif");

	// define the meshes to preload
	this._requestMeshList.push("./Meshes/ch_t.obj");

	// define the shaders to preload
	this._requestShaderList.push("./Shaders/basic.vert");
	this._requestShaderList.push("./Shaders/basic.frag");
};

VENUS.ResourceManager.prototype._loadImages = function(imageRawDatas) {
	var images = this._images;
	var requestImageList = this._requestImageList;

	for (var key in imageRawDatas) {
		var imgType = VENUS.FileUtil.getFileSubfixFromName(key);
		image = new Image();
		image.src = "data:image/" + imgType + ";base64," + imageRawDatas[key];
		images[key] = image;
	}

};

VENUS.ResourceManager.prototype._loadMeshed = function(meshRawDates) {
	for (var key in meshRawDates) {
		var meshType = VENUS.FileUtil.getFileSubfixFromName(key);

		/**
	parse obj
	presume that pointlist is before texSTList
*/
		var pointList = []; //point list
		var indexList = []; //index list
		var texPointList = [];
		var texFaceList = []; //texture coordinate of face
		var rawmesh = meshRawDates[key].split("\n");
		for (var lineNum = 0; lineNum < rawmesh.length; lineNum++) {
			var tokens = rawmesh[lineNum].split(/\s+/);
			if (tokens[0] == "v") { //It is point coordinates;
				for (var pi = 1; pi <= 3; pi++) {
					pointList.push(parseFloat(tokens[pi]));
				}
			} else if (tokens[0] == "vt") { //it is texture coordinates;
				for (var ti = 1; ti <= 2; ti++) { //only S and T coordinate
					texPointList.push(parseFloat(tokens[ti]));
				}
			} else if (tokens[0] == "f") //It is a face index,include coordinate and texture index;
			{
				for (var fi = 1; fi <= 3; fi++) {
					var coordTex = tokens[fi].split("/");
					indexList.push(parseInt(coordTex[0]) - 1);
					texFaceList.push((texPointList[(parseInt(coordTex[1]) - 1) * 2]));
					texFaceList.push((texPointList[(parseInt(coordTex[1]) - 1) * 2 + 1]));
				}
			}

		}
	}
};

VENUS.ResourceManager.prototype._loadShaders = function(shaderRawData) {
	this._shaders = shaderRawData;
};

VENUS.ResourceManager.prototype._initDefaultShaderProgram = function() {
	var vertexShader = new VENUS.Shader(VENUS.VERTEX_SHADER_TYPE);
	var fragShader = new VENUS.Shader(VENUS.FRAGMENT_SHADER_TYPE);

	this._defaultShaderProgram = new VENUS.Program();

	vertexShader.setShaderSourceCode(this.getShaderByPath("./Shaders/basic.vert"));
	vertexShader.compile();

	fragShader.setShaderSourceCode(this.getShaderByPath("./Shaders/basic.frag"));
	fragShader.compile();

	this._defaultShaderProgram.attachVertexShader(vertexShader);
	this._defaultShaderProgram.attachFragmentShader(fragShader);

	this._defaultShaderProgram.link();
	this._defaultShaderProgram.bind();
};

