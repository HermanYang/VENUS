VENUS.WebGLBillboardRenderer = function(billboard) {
	VENUS.WebGLRenderer.call(this, billboard);

	this._context = VENUS.Engine.getInstance().getWebGLConfiguration().getContext();
	this._program = VENUS.Engine.getInstance().getResourceManager().getProgramByPath("/shaders/billboard");

	this._offsetDirectionBuffer = new VENUS.ArrayBuffer();
	this._textureCoordBuffer = new VENUS.ArrayBuffer();
};

VENUS.WebGLBillboardRenderer.prototype = Object.create(VENUS.WebGLRenderer);

VENUS.WebGLBillboardRenderer.prototype.render = function(projectionMatrix, viewMatrix, position) {
	var webglConst = VENUS.Engine.getWebGLConstants();
	this._setupShaderProgram(projectionMatrix, viewMatrix, position);

	VENUS.ArrayBuffer.drawArrays(webglConst.TRIANGLES, 6);
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
	var webglConst = VENUS.Engine.getWebGLConstants();

	var texture = billboard.getMaterial().get2DTexture();
	program.setTexture("uTexture", texture, webglConst.LINEAR, webglConst.LINEAR, webglConst.CLAMP_TO_EDGE, webglConst.CLAMP_TO_EDGE);

};

VENUS.WebGLBillboardRenderer.prototype._setupShaderProgram = function(projectionMatrix, viewMatrix, position) {
	var program = this._program;
	program.bind();

	var webglConst = VENUS.Engine.getWebGLConstants();
	var billboard = this._renderableObject;
	var width = billboard.getWidth();
	var height = billboard.getHeight();

	this._setupBuffers();

	this._setupTextures();

	program.setUniformVector3("uPosition", new VENUS.Vector3(0, 0, 0));
	program.setUniformFloat("uWidth", width);
	program.setUniformFloat("uHeight", height);
	program.setUniformMatrix44("uProjectionMatrix", projectionMatrix);
	program.setUniformMatrix44("uViewMatrix", viewMatrix);

};

VENUS.WebGLBillboardRenderer.prototype._setupBuffers = function() {
	var program = this._program;
	this._updateBuffers();

	this._offsetDirectionBuffer.bindProgramAttribute(program, "aOffsetDirection");
	this._textureCoordBuffer.bindProgramAttribute(program, "aTextureCoord");
};

