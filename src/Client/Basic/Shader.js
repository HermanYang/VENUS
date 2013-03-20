VENUS.Shader = function(type) {
	this.gl = VENUS.Engine.getInstance().getWebGLConfiguration().getContext();

	this.type = type;
	this._sourceCode = null;
	this._shader = null;
}

VENUS.Shader.prototype.compile = function(defines) {
	var gl = this.gl;
	var type = this.type;
	var webglConst = VENUS.Engine.getWebGLConstants();
	if (type == webglConst.SHADER_TYPE_FRAGMENT) {
		this._shader = gl.createShader(gl.FRAGMENT_SHADER);
	}
	else if (type == webglConst.SHADER_TYPE_VERTEX) {
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

