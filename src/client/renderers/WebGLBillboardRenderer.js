VENUS.WebGLBillboardRenderer = function(billboard) {
	VENUS.WebGLRenderer.call(this, billboard);

	this._context = VENUS.Engine.getInstance().getWebGLConfiguration().getContext();
	this._program = VENUS.Engine.getInstance().getResourceManager().getProgramByPath("/shaders/billboard");

	this._offsetDirectionBuffer = new VENUS.ArrayBuffer();
	this._textureCoordBuffer = new VENUS.ArrayBuffer();

};

VENUS.WebGLBillboardRenderer.prototype = Object.create(VENUS.WebGLRenderer);

VENUS.WebGLBillboardRenderer.prototype.render = function(projectionMatrix, viewMatrix, position) {

	this._setupShaderProgram(projectionMatrix, viewMatrix, position);
	this._drawBillboard();

};

VENUS.WebGLBillboardRenderer.prototype._drawBillboard = function() {
	var webglConst = VENUS.Engine.getWebGLConstants();
	var arrayBufferElementAmount = 6;
	var billboard = this._renderableObject;
	var material = billboard.getMaterial();

	if (material.isTransparent()) {
		var gl = this._context;
		gl.enable(gl.BLEND);
		gl.disable(gl.DEPTH_TEST);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

		VENUS.ArrayBuffer.drawArrays(webglConst.TRIANGLES, arrayBufferElementAmount);

		gl.disable(gl.BLEND);
		gl.enable(gl.DEPTH_TEST);
	}
	else {
		VENUS.ArrayBuffer.drawArrays(webglConst.TRIANGLES, arrayBufferElementAmount);
	}
};

VENUS.WebGLBillboardRenderer.prototype._updateBuffers = function() {
	var program = this._program;

	var webglConst = VENUS.Engine.getWebGLConstants();
	var billboard = this._renderableObject;

	var offsetDirections = billboard.getOffsetDirections();
	var textureCoords = billboard.getTexturCoords();
	var vectorDimension = 0;

	vectorDimension = 2;
	this._offsetDirectionBuffer.createBuffer(offsetDirections, vectorDimension, webglConst.ARRAY_BUFFER, VENUS.FLOAT_ARRAY, webglConst.STATIC_DRAW);

	vectorDimension = 2;
	this._textureCoordBuffer.createBuffer(textureCoords, vectorDimension, webglConst.ARRAY_BUFFER, VENUS.FLOAT_ARRAY, webglConst.STATIC_DRAW);
};

VENUS.WebGLBillboardRenderer.prototype._setupTextures = function() {
	var program = this._program;
	var billboard = this._renderableObject;
	var material = billboard.getMaterial();
	var webglConst = VENUS.Engine.getWebGLConstants();

	var texture = material.get2DTexture();

	program.setTexture("uTexture", texture, webglConst.LINEAR, webglConst.LINEAR, webglConst.CLAMP_TO_EDGE, webglConst.CLAMP_TO_EDGE);

};

VENUS.WebGLBillboardRenderer.prototype._setupShaderProgram = function(projectionMatrix, viewMatrix, position) {
	var program = this._program;
	program.bind();

	var webglConst = VENUS.Engine.getWebGLConstants();
	var billboard = this._renderableObject;
	var material = billboard.getMaterial();
	var width = billboard.getWidth();
	var height = billboard.getHeight();
	var alpha = material.getAlpha();
	var color = material.getColor();
	this._setupBuffers();

	this._setupTextures();

	program.setUniformVector3("uPosition", position);
	program.setUniformVector4("uColor", color);
	program.setUniformMatrix44("uProjectionMatrix", projectionMatrix);
	program.setUniformMatrix44("uViewMatrix", viewMatrix);
	program.setUniformFloat("uWidth", width);
	program.setUniformFloat("uHeight", height);
	program.setUniformFloat("uAlpha", alpha);
};

VENUS.WebGLBillboardRenderer.prototype._setupBuffers = function() {
	var program = this._program;
	this._updateBuffers();

	this._offsetDirectionBuffer.bindProgramAttribute(program, "aOffsetDirection");
	this._textureCoordBuffer.bindProgramAttribute(program, "aTextureCoord");
};

