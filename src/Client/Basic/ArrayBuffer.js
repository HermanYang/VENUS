VENUS.ArrayBuffer = function() {
	this._buffer = null;
	this._stride = null;
	this._length = 0;
	this._context = VENUS.Engine.getInstance().getWebGLConfiguration().getContext();
	this._arrayType = null;
	this._dataType = null;
}

VENUS.ArrayBuffer.prototype.bindProgramAttribute = function(program, attributeName) {
	program.setAttribute(attributeName, this._buffer, this._stride);
};

VENUS.ArrayBuffer.prototype.bindDefaultProgramAttribute = function(attributeName) {
	var program = VENUS.Engine.getInstance().getResourceManager().getDefaultProgram();
	this.bindProgramAttribute(program, attributeName);
};

VENUS.ArrayBuffer.prototype.createBuffer = function(dataVectors, dimension, arrayType, dataType, bufferHint) {
	var gl = this._context;
	this._arrayType = arrayType;
	this._dataType = dataType;

	this.releaseBuffer();

	this._buffer = gl.createBuffer();
	gl.bindBuffer(arrayType, this._buffer);
	var unpackedData = VENUS.unpackedVectors(dataVectors, dimension);
	gl.bufferData(arrayType, new dataType(unpackedData), bufferHint);

	this._stride = dimension;
	this._length = dataVectors.length;
};

VENUS.ArrayBuffer.prototype.releaseBuffer = function() {
	if (this._buffer != null) {
		var gl = this._context;
		gl.deleteBuffer(this._buffer);
		this._buffer = null;
	}
}

VENUS.ArrayBuffer.prototype.getLength = function() {
	return this._length;
};

VENUS.ArrayBuffer.prototype.getLength = function() {
	return this._stride;
};

VENUS.ArrayBuffer.prototype.drawElements = function(type) {
	var webglConst = VENUS.Engine.getWebGLConstants();
	var gl = this._context;

	VENUS.assert(this._arrayType == webglConst.ELEMENT_ARRAY_BUFFER,"only ELEMENT_ARRAY_BUFFER can be draw");
	gl.bindBuffer(this._arrayType, this._buffer);
	gl.drawElements(type, this._length, webglConst.UNSIGNED_SHORT, 0);

};


