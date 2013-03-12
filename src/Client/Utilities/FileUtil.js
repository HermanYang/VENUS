VENUS.FileUtil = {};

VENUS.FileUtil.getFileSubfixFromName = function(fileName){
	var index = fileName.lastIndexOf(".");
	if(index == -1 && index < (fileName.length - 1)){
		// this file has no suffixes
		return "";
	}

	var subfixName =  fileName.slice(index + 1);
	return subfixName;
}
