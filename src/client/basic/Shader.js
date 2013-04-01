VENUS.Shader = function(type) {
	this._context = VENUS.Engine.getInstance().getWebGLConfiguration().getContext();

	this.type = type;
	this._sourceCode = null;
	this._shader = null;
};

VENUS.Shader.prototype.compile = function() {
	var gl = this._context;
	var type = this.type;
	var webglConst = VENUS.Engine.getWebGLConstants();

	this.releaseShader();
	
	if (type === webglConst.SHADER_TYPE_FRAGMENT) {
		this._shader = gl.createShader(gl.FRAGMENT_SHADER);
	}
	else if (type === webglConst.SHADER_TYPE_VERTEX) {
		this._shader = gl.createShader(gl.VERTEX_SHADER);
	}
	else {
		Log.error("Shader type error");
	}

	SharedUtil.assert(this._sourceCode !== null, "Shader source code must be set before being compiled");
	// compile shader
	gl.shaderSource(this._shader, this._sourceCode);
	gl.compileShader(this._shader);

	SharedUtil.assert(gl.getShaderParameter(this._shader, gl.COMPILE_STATUS),  gl.getShaderInfoLog(this._shader));

};

VENUS.Shader.prototype.setShaderSourceCode = function(code) {
	SharedUtil.assert(code !== undefined && code.length > 0, "shader code must contain code strings");
	this._sourceCode = code;
};

VENUS.Shader.prototype.getShader = function(){
	return this._shader;
};

VENUS.Shader.prototype.releaseShader = function(){
	var gl = this._context;

	if( this._shader !== null){
		gl.deleteShader(this._shader);
		this._shader = null;
	}
};
