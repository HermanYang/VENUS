VENUS.Shader = function(type) {
	this.type = type;
	this._sourceCode = null;
	this._shader = null;
}

VENUS.Shader.prototype.compile = function(defines) {
	var gl = VENUS.Engine.getInstance().getContext();
	var type = this.type;

	if (type == VENUS.FRAGMENT_SHADER_TYPE) {
		this._shader = gl.createShader(gl.FRAGMENT_SHADER);
	}
	else if (type == VENUS.VERTEX_SHADER_TYPE) {
		this._shader = gl.createShader(gl.VERTEX_SHADER);
	}
	else {
		alert("shader type error!");
	}

	// compile vertex shader and fragment shader
	gl.shaderSource(this._shader, this._sourceCode);
	gl.compileShader(this._shader);

	if (!gl.getShaderParameter(this._shader, gl.COMPILE_STATUS) ) {
		alert(gl.getShaderInfoLog(this._shader));
	}
}

VENUS.Shader.prototype.setShaderSourceCode = function(code) {
	VENUS.assert(code != null && code.length > 0, "shader code must contain code strings");
	this._sourceCode = code;
}

VENUS.Shader.prototype.getShader = function(){
	return this._shader;
}

