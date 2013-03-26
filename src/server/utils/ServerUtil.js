Log = module.require("../Log.js");
ContentTypeMap = module.require("../ContentTypeMap.js");
assert = module.require("assert");
FileUtil = module.require("../../share/utils/FileUtil.js");

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
	var type = this.getFileExtensionByPath(path);
	var contentType = ContentTypeMap[type];

	if (contentType === undefined) {
		contentType = "text/plain";
	}

	return {
		"Content-Type": contentType
	};
};

ServerUtil.prototype.getFileMainNameByPath = function(path) {
	return FileUtil.getFileMainNameByPath(path);
}

ServerUtil.prototype.isFile = function(path){
	var stats = this._fileSystemManager.Stats();
	return stats.isFile(path);
}

ServerUtil.prototype.getFileExtensionByPath = function(path) {
	return FileUtil.getFileExtensionByPath(path);
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

module.exports = ServerUtil;
