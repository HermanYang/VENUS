VENUS.assert = function(conditon, errMsg){
	if(!conditon){
		alert(errMsg);
		throw new Error(errMsg);
	}
}
 
VENUS.unpackedVectors = function(vectors, dimension) {
	var size = vectors.length * dimension;
	unpackedArray = new VENUS.FLOAT_ARRAY_TYPE(size);
	for (var i = 0; i < vectors.length; i++) {
		for (var j = 0; j < dimension; j++) {
			unpackedArray[i * dimension + j] = vectors[i].elements[j];
		}
	}
	return unpackedArray;
}

