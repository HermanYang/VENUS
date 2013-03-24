VENUS.assert = function(conditon, errMsg){
	if(!conditon){
		alert(errMsg);
		throw new Error(errMsg);
	}
}
 
VENUS.unpackedVectors = function(vectors, dimension) {
	if(dimension <= 1){
		return vectors;
	}

	var size = vectors.length * dimension;
	unpackedArray = new VENUS.FLOAT_ARRAY(size);
	for (var i = 0; i < vectors.length; i++) {
		for (var j = 0; j < dimension; j++) {
			unpackedArray[i * dimension + j] = vectors[i].elements[j];
		}
	}
	return unpackedArray;
}

