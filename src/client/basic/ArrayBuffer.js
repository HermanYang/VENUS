/*
 *This class encapsulate webgl array buffer.
 */
VENUS.ArrayBuffer = function() {
	this._context = VENUS.Engine.getInstance().getWebGLConfiguration().getContext();

	this._buffer = null;
	this._dimension = 0;
	this._length = 0;

	this._bufferType = null;
	this._dataType = null;
}

VENUS.ArrayBuffer.prototype.bindProgramAttribute = function(program, attributeName, stride, offset) {
	program.setAttribute(attributeName, this, stride, offset);
};

VENUS.ArrayBuffer.prototype.bindDefaultProgramAttribute = function(attributeName, stride, offset) {
	var program = VENUS.Engine.getInstance().getResourceManager().getDefaultProgram();
	this.bindProgramAttribute(program, attributeName, stride, offset);
};

VENUS.ArrayBuffer.prototype.bind = function() {
	if(this._buffer === null){
		return false;
	}

	var gl = this._context;
	gl.bindBuffer(this._bufferType, this._buffer);
	return true;
};

VENUS.ArrayBuffer.prototype.createBuffer = function(vectorArray, dimension, bufferType, dataType, usage) {
	var gl = this._context;
	this._bufferType = bufferType;
	this._dataType = dataType;
	this._dimension = dimension;
	this._length = vectorArray.length;

	this.releaseBuffer();

	this._buffer = gl.createBuffer();

	gl.bindBuffer(bufferType, this._buffer);
	var unpackedData = SharedUtil.unpackedVectors(vectorArray, dimension);
	gl.bufferData(bufferType, new dataType(unpackedData), usage);

};

VENUS.ArrayBuffer.prototype.releaseBuffer = function() {
	if (this._buffer !== null) {
		var gl = this._context;
		gl.deleteBuffer(this._buffer);
		this._buffer = null;
	}
}

VENUS.ArrayBuffer.prototype.updateBuffer = function(beginIndex, endIndex, vectorArray) {
	var gl = this._context;
	var bufferType = this._bufferType;
	var dataType = this._dataType;
	var dimension = this._dimension;

	var data = vectorArray.slice(beginIndex, endIndex);
	gl.bindBuffer(bufferType, this._buffer);
	var unpackedData = SharedUtil.unpackedVectors(data, dimension);
	gl.bufferSubData(bufferType, beginIndex, new dataType(data));
};
VENUS.ArrayBuffer.prototype.getLength = function() {
	return this._length;
};

VENUS.ArrayBuffer.prototype.getDimension = function() {
	return this._dimension;
};

VENUS.ArrayBuffer.prototype.getDataType = function() {
	return this._dataType;
};

VENUS.ArrayBuffer.prototype.getDataElementType = function() {
	var webglConst = VENUS.Engine.getWebGLConstants();
	var type = null;

	//TODO: map array data type to element type.
	switch (this._dataType) {
	case VENUS.FLOAT_ARRAY:
		{
			type = webglConst.FLOAT;
			break;
		}

	case VENUS.UNSIGNED_INT_ARRAY:
		{
			type = webglConst.UNSIGNED_SHORT;
			break;
		}

	}
	SharedUtil.assert(type !== null, "Type error");
	return type;
};

/*
 *This function should be used by ELEMENT_ARRAY_BUFFER only.
 */
VENUS.ArrayBuffer.prototype.drawElements = function(type) {
	var webglConst = VENUS.Engine.getWebGLConstants();
	var gl = this._context;

	SharedUtil.assert(this._bufferType == webglConst.ELEMENT_ARRAY_BUFFER, "only ELEMENT_ARRAY_BUFFER can be draw");
	gl.bindBuffer(this._bufferType, this._buffer);
	gl.drawElements(type, this._length, webglConst.UNSIGNED_SHORT, 0);
};

