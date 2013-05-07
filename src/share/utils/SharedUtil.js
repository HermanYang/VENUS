SharedUtil = {};

SharedUtil._currentId = - 1;
SharedUtil.openAssert = false;

SharedUtil.assert = function(conditon, errMsg) {
	if (SharedUtil.openAssert) {
		console.assert(conditon, errMsg);
	}
}

SharedUtil.unpackedVectors = function(vectors, dimension) {
	if (dimension <= 1) {
		return vectors;
	}

	var size = vectors.length * dimension;
	unpackedArray = new VENUS.FLOAT_ARRAY(size);
	for (var i = 0; i < vectors.length; i++) {
		for (var j = 0; j < dimension; j++) {
			var elements = vectors[i].getElements();
			unpackedArray[i * dimension + j] = elements[j];
		}
	}
	return unpackedArray;
}

SharedUtil.getUniqueId = function() {
	SharedUtil._currentId += 1;
	return SharedUtil._currentId;
};

SharedUtil.getCurrentTime = function(){
	return new Date().getTime();
};

if ("undefined" !== typeof module) {
	module.exports = SharedUtil;
}

