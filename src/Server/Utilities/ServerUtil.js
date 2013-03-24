Log = module.require("../Log.js");
ContentTypeMap = module.require("../ContentTypeMap.js");
assert = module.require("assert");

ServerUtil = function() {
	this._urlUtil = module.require("url");
	this._fileSystemManager = module.require("fs");
	this._config = {};
	this._initServerConfig();

	process.chdir(this.getRootPath());
};

ServerUtil._instance = null;

ServerUtil.getInstance = function() {
	if (ServerUtil._instance == null) {
		ServerUtil._instance = new ServerUtil();
	}
	return ServerUtil._instance;
};

ServerUtil.prototype._initServerConfig = function(){
	configFile = this._fileSystemManager.readFileSync(__dirname + "/../../config", "utf8");
	configFile = configFile.split("\n");
	for(var i in configFile){
		if(configFile[i].charAt(0) === "#"){
			continue;
		}
		var keyPair = configFile[i].split("=");
		this._config[keyPair[0]] = keyPair[1];
	}

};

ServerUtil.prototype.getHttpHeadMessage = function(path) {
	var type = this.getFileSubfixFromName(path);
	var contentType = ContentTypeMap[type];

	if (contentType === undefined) {
		contentType = "text/plain";
	}

	return {
		"Content-Type": contentType
	};
};

ServerUtil.prototype.getFileSubfixFromName = function(fileName) {
	var index = fileName.lastIndexOf(".");
	if (index == - 1 && index < (fileName.length - 1)) {
		// this file has no suffixes
		return "";
	}

	var subfixName = fileName.slice(index + 1);
	return subfixName;
}

ServerUtil.prototype.getUrlUtil = function() {
	return this._urlUtil;
};

ServerUtil.prototype.getRootPath = function() {
	return this._config["SERVER_ROOT"];
};

ServerUtil.prototype.getResourcePath = function() {
	return this._config["RESOURCE_DIR"];
};

ServerUtil.prototype.setRootPath = function(path) {
	this._rootPath = path;
	process.chdir(this._rootPath);
	return this;
};

ServerUtil.prototype.getFileSystemManager = function() {
	return this._fileSystemManager;
};

ServerUtil.prototype.include = function(path) {
	fsManager = this._fileSystemManager;
	var file = fsManager.readFileSync(path, "utf8");
	eval(file);
};

module.exports = ServerUtil;
