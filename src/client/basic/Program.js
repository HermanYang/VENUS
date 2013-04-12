VENUS.Program = function() {
	this._context = VENUS.Engine.getInstance().getWebGLConfiguration().getContext();
	this._shaderProgram = null;
	this._fragShader = null;
	this._vertexShader = null;
	this._availableTextureIndex = 2;

};

VENUS.Program.prototype.attachFragmentShader = function(Fs) {
	this._fragShader = Fs.getShader();
};

VENUS.Program.prototype.attachVertexShader = function(Vs) {
	this._vertexShader = Vs.getShader();
};

VENUS.Program.prototype.link = function() {
	var gl = this._context;

	this.releaseProgram();

	this._shaderProgram = gl.createProgram();

	gl.attachShader(this._shaderProgram, this._vertexShader);
	gl.attachShader(this._shaderProgram, this._fragShader);

	gl.linkProgram(this._shaderProgram);

	if (!gl.getProgramParameter(this._shaderProgram, gl.LINK_STATUS)) {
		alert("Could not initialise shaders");
	}
};

VENUS.Program.prototype.bind = function() {
	var gl = this._context;

	gl.useProgram(this._shaderProgram);
};

VENUS.Program.prototype.setAttribute = function(attributesName, arrayBuffer, stride, offset) {
	var gl = this._context;

	var size = arrayBuffer.getDimension();
	var type = arrayBuffer.getDataElementType();
	var normalize = false;

	if (arrayBuffer.bind()) {
		var attributeLocation = gl.getAttribLocation(this._shaderProgram, attributesName);
		gl.enableVertexAttribArray(attributeLocation);
		gl.vertexAttribPointer(attributeLocation, size, type, normalize, stride, offset);
	}
};

VENUS.Program.prototype.releaseProgram = function() {
	var gl = this._context;

	if (this._shaderProgram !== null) {
		gl.deleteProgram(this._shaderProgram);
		this._shaderProgram = null;
	}
};

VENUS.Program.prototype.setUniformMatrix44 = function(paramName, value) {
	var gl = this._context;
	var address = gl.getUniformLocation(this._shaderProgram, paramName);

	gl.uniformMatrix4fv(address, false, value.getElements());
};

VENUS.Program.prototype.setUniformInt = function(paramName, value) {
	var gl = this._context;
	var address = gl.getUniformLocation(this._shaderProgram, paramName);

	gl.uniform1i(address, value);
};

VENUS.Program.prototype.setUniformIntArray = function(paramName, value) {
	var gl = this._context;
	var address = gl.getUniformLocation(this._shaderProgram, paramName);

	gl.uniform1iv(address, value);
};

VENUS.Program.prototype.setUniformFloat = function(paramName, value) {
	var gl = this._context;
	var address = gl.getUniformLocation(this._shaderProgram, paramName);

	gl.uniform1f(address, value);
};

VENUS.Program.prototype.setUniformFloatArray = function(paramName, value) {
	var gl = this._context;
	var address = gl.getUniformLocation(this._shaderProgram, paramName);

	gl.uniform1fv(address, value);
};

VENUS.Program.prototype.setUniformVector2 = function(paramName, vector2) {};

VENUS.Program.prototype.setUniformVector3 = function(paramName, vector3) {
	var gl = this._context;
	var address = gl.getUniformLocation(this._shaderProgram, paramName);

	gl.uniform3f(address, vector3.getX(), vector3.getY(), vector3.getZ());

};

VENUS.Program.prototype.setUniformVector4 = function(paramName, vector4) {
	var gl = this._context;
	var address = gl.getUniformLocation(this._shaderProgram, paramName);

	gl.uniform4f(address, vector4.getX(), vector4.getY(), vector4.getZ(), vector4.getW());


};

VENUS.Program.prototype.setUniformVector3Array = function(paramName, vector3Array) {
	var gl = this._context;
	var unpackedData = SharedUtil.unpackedVectors(vector3Array, 3);
	var address = gl.getUniformLocation(this._shaderProgram, paramName);

	gl.uniform3fv(address, unpackedData);
};


VENUS.Program.prototype.setSampler = function(paramName, value) {
	this.setUniformInt(paramName, value);
};

VENUS.Program.prototype.setTexture = function(paramName, texture, minFilterEnum, magFilterEnum, wrapInS, wrapInT) {
	var gl = this._context;
	var address = gl.getUniformLocation(this._shaderProgram, paramName);
	if (texture !== null) {
		texture.setMinFilter(minFilterEnum);
		texture.setMagFilter(magFilterEnum);
		texture.setWraps(wrapInS, wrapInT);

		gl.uniform1i(address, texture.getIndex());
		texture.bind();
	}
};

VENUS.Program.prototype.getLog = function() {
	var gl = this._context;
	SharedUtil.assert(this._shaderProgram !== null, "Program should be initilized");

	gl.getProgramInfoLog(this._shaderProgram);
};

VENUS.Program.prototype.getUniformValue = function(paramName) {
	var gl = this._context;
	var address = gl.getUniformLocation(this._shaderProgram, paramName);
	return gl.getUniform(this._shaderProgram, address);
}

VENUS.Program.prototype.logUniformValue = function(paramName) {
	Log.verbose(paramName);
	Log.info(this.getUniformValue(paramName));
}

