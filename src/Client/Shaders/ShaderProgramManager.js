VENUS.ShaderProgramManager = function(context) {
	this.gl = context;
};

VENUS.ShaderProgramManager.prototype.getShaderProgram = function(material) {
	var gl = this.gl;

	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);

	// compile vertex shader and fragment shader
	gl.shaderSource(vertexShader, VENUS.ShaderProgramLib.basic.vert);
	gl.compileShader(vertexShader);

	gl.shaderSource(fragmentShader, VENUS.ShaderProgramLib.basic.frag);
	gl.compileShader(fragmentShader);

	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS) || ! gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		alert(gl.getShaderInfoLog(vertexShader));
	}

	// create shader program
	var shaderProgram = gl.createProgram();

	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);

	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		alert("Could not initialise shaders");
	}

	gl.useProgram(shaderProgram);

	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

	shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
	gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

	shaderProgram.vertexTextureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
	gl.enableVertexAttribArray(shaderProgram.vertexTextureCoordAttribute);

	shaderProgram.projectMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	shaderProgram.modelViewMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");

	return shaderProgram;
}

