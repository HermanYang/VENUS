VENUS.Program = function() {
	var gl = VENUS.Engine.getInstance().getContext();
	this._shaderProgram = gl.createProgram();
}

VENUS.Program.prototype.attachFragmentShader = function(Fs) {
	var gl = VENUS.Engine.getInstance().getContext();
	gl.attachShader(this._shaderProgram, Fs.getShader());
}

VENUS.Program.prototype.attachVertexShader = function(Vs) {
	var gl = VENUS.Engine.getInstance().getContext();
	gl.attachShader(this._shaderProgram, Vs.getShader());
}

VENUS.Program.prototype.link = function() {
	var gl = VENUS.Engine.getInstance().getContext();
	gl.linkProgram(this._shaderProgram);
}

VENUS.Program.prototype.bind = function() {

	var gl = VENUS.Engine.getInstance().getContext();
	if (!gl.getProgramParameter(this._shaderProgram, gl.LINK_STATUS)) {
		alert("Could not initialise shaders");
	}
	gl.useProgram(this._shaderProgram);
}

VENUS.Program.prototype.setAttribute = function(attributesName, buf, stride) {
	var gl = VENUS.Engine.getInstance().getContext();
	var attributeLocation = gl.getAttribLocation(this._shaderProgram, attributesName);
	gl.enableVertexAttribArray(attributeLocation);
	gl.bindBuffer(gl.ARRAY_BUFFER, buf);
	gl.vertexAttribPointer(attributeLocation, stride, gl.FLOAT, false, 0, 0);
}

VENUS.Program.prototype.releaseProgram = function() {

}

VENUS.Program.prototype.setUniformMatrix44 = function(uniformValName, matrix44) {
	var gl = VENUS.Engine.getInstance().getContext();
	var uniformValueAddress = gl.getUniformLocation(this._shaderProgram, uniformValName);
	gl.uniformMatrix4fv(uniformValueAddress, false, matrix44.convertToGLMatrixFormat());
}

VENUS.Program.prototype.setUniformInt = function(uniformValName, intValue) {
	var gl = VENUS.Engine.getInstance().getContext();
	var uniformValueAddress = gl.getUniformLocation(this._shaderProgram, uniformValName);
	gl.uniform1i(uniformValueAddress, intValue);
}

