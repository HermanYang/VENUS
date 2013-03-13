VENUS.ResourceManager = function() {
	this._instance = null;

	this.images = {};
	this.meshes = {};
	this.shaders = {};

	this.requestImageList = [];
	this.requestMeshList = [];
	this.requestShaderList = [];

	this._initRequestResourceList();

};

VENUS.ResourceManager.getInstance = function() {
	if (this._instance == null) {
		this._instance = new VENUS.ResourceManager();
	}

	return this._instance;
};

VENUS.ResourceManager.prototype.loadResources = function(callBack) {
	var socket = io.connect("http://localhost");
	requestImageList = this.requestImageList;
	requestMeshList = this.requestMeshList;
	requestShaderList = this.requestShaderList;

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
	}
	socket.on("connect", onConnected);

	socket.on("response resources", onResourcesResponed);

	return this;
};

VENUS.ResourceManager.prototype.getImageByPath = function(imgName) {
	return this.images[imgName];
};

VENUS.ResourceManager.prototype._initRequestResourceList = function() {
	this.requestImageList.push("./Images/crate.gif");

	this.requestMeshList.push("./Meshes/ch_t.obj");
}

VENUS.ResourceManager.prototype._loadImages = function(imageRawDatas) {
	var images = this.images;
	var requestImageList = this.requestImageList;

	for (var key in imageRawDatas) {
		var imgType = VENUS.FileUtil.getFileSubfixFromName(key);
		image = new Image();
		image.src = "data:image/" + imgType + ";base64," + imageRawDatas[key];
		images[key] = image;
	}

};

VENUS.ResourceManager.prototype._loadMeshed = function(meshRawDates) {
	for (var key in meshRawDates){
		var meshType = VENUS.FileUtil.getFileSubfixFromName(key);
		
/**
	parse obj
	presume that pointlist is before texSTList
*/
		var pointList = []; //point list
		var indexList = []; //index list
		var texPointList = [];
		var texFaceList = [];  //texture coordinate of face
		var rawmesh = meshRawDates[key].split("\n");
		for(var lineNum = 0; lineNum<rawmesh.length; lineNum++){
			var tokens = rawmesh[lineNum].split(/\s+/);
			if(tokens[0] == "v"){            //It is point coordinates;
				for(var pi=1;pi<=3;pi++){
					pointList.push(parseFloat(tokens[pi]));
				}
			}else if(tokens[0] == "vt"){	//it is texture coordinates;
				for(var ti=1;ti<=2;ti++){   //only S and T coordinate
					texPointList.push(parseFloat(tokens[ti]));
				}
			}else if(tokens[0] == "f")              //It is a face index,include coordinate and texture index;
			{
				for(var fi = 1; fi<=3; fi++){
					var coordTex = tokens[fi].split("/");
					indexList.push(parseInt(coordTex[0])-1);
					texFaceList.push((texPointList[(parseInt(coordTex[1])-1)*2]));
					texFaceList.push((texPointList[(parseInt(coordTex[1])-1)*2+1]));
				}				
			}
			
		}
	}
};

VENUS.ResourceManager.prototype._loadShaders = function(name) {

};

VENUS.ResourceManager.prototype._checkResourcesLoaded = function() {
	var requestImageList = this.requestImageList;
	var requestMeshList = this.requestMeshList;
	var requestShaderList = this.requestShaderList;

	for (var i in requestImageList) {
		if (this.images[requestImageList[i]] === undefined) {
			return false;
		}
	}

	for (var i in requestMeshList) {
		if (this.meshes[requestMeshList[i]] === undefined) {
			return false;
		}
	}

	for (var i in requestShaderList) {
		if (this.shaders[requestShaderList[i]] === undefined) {
			return false;
		}
	}
	return true;
};

