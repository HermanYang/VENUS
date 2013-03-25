if ("undefined" !== typeof module) {
	VENUS = module.require("../../Venus.js");
}

VENUS.FileUtil = {};

VENUS.FileUtil.getFileExtensionByPath = function(path) {
	var index = path.lastIndexOf(".");
	if (index == - 1 && index < (path.length - 1)) {
		// this file has no extension 
		return "";
	}

	var extension = path.slice(index + 1);

	return extension;
}

VENUS.FileUtil.getFileMainNameByPath = function(path) {
	var indexStart = path.lastIndexOf("/") + 1;
	var indexEnd = path.lastIndexOf(".");
	if( indexEnd === -1){
		indexEnd = path.length - 1;
	}

	return path.substring(indexStart, indexEnd);
};

if ("undefined" !== typeof module) {
	module.exports = VENUS.FileUtil;
}
