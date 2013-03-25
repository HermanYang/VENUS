/*
 *special renderer to render Entity
 */
VENUS.WebGLEntityRenderer = function(entity) {
	VENUS.WebGLRenderer.call(this, entity);
	this._context = VENUS.Engine.getInstance().getWebGLConfiguration().getContext();

	this._vertexBuffer = new VENUS.ArrayBuffer();
	this._indexBuffer = new VENUS.ArrayBuffer();
	this._normalBuffer = new VENUS.ArrayBuffer();
	this._colorBuffer = new VENUS.ArrayBuffer();
	this._textureCoordBuffer = new VENUS.ArrayBuffer();
}

VENUS.WebGLEntityRenderer.prototype = Object.create(VENUS.WebGLRenderer);

VENUS.WebGLEntityRenderer.prototype._updateBuffers = function() {
	var gl = this._context;
	var entity = this._renderableObject;

	var vectorDimension = 0;
	var vertices = entity._mesh.getVertices();
	var indices = entity._mesh.getIndices();
	var normals = entity._mesh.getNormals();
	var textureCoords = entity._mesh.getTextureCoords();

	var colors = entity._material.getColors();

	var verticesChanged = entity._mesh.verticesChanged;
	var indicesChanged = entity._mesh.indicesChanged;
	var normalsChanged = entity._mesh.normalsChanged;
	var textureCoordsChanged = entity._mesh.textureCoordsChanged;
	var colorsChanged = entity._material.colorsChanged;

	var webglConst = VENUS.Engine.getWebGLConstants();

	if (verticesChanged) {
		vectorDimension = 3;
		this._vertexBuffer.createBuffer(vertices, vectorDimension, webglConst.ARRAY_BUFFER, VENUS.FLOAT_ARRAY, webglConst.STATIC_DRAW);
		entity._mesh.verticesChanged = false;
	}

	if (indicesChanged) {
		vectorDimension = 1;
		this._indexBuffer.createBuffer(indices, vectorDimension, webglConst.ELEMENT_ARRAY_BUFFER, VENUS.UNSIGNED_INT_ARRAY, webglConst.STATIC_DRAW);
		entity._mesh.indicesChanged = false;
	}

	if (normalsChanged) {
		vectorDimension = 3;
		this._normalBuffer.createBuffer(normals, vectorDimension, webglConst.ARRAY_BUFFER, VENUS.FLOAT_ARRAY, webglConst.STATIC_DRAW);
		entity._mesh.normalsChanged = false;
	}

	if (textureCoordsChanged) {
		vectorDimension = 2;
		this._textureCoordBuffer.createBuffer(textureCoords, vectorDimension, webglConst.ARRAY_BUFFER, VENUS.FLOAT_ARRAY, webglConst.STATIC_DRAW);
		entity._mesh.textureCoordsChanged = false;
	}

	if (colorsChanged) {
		vectorDimension = 4;
		this._colorBuffer.createBuffer(colors, vectorDimension, webglConst.ARRAY_BUFFER, VENUS.FLOAT_ARRAY, webglConst.STATIC_DRAW);
		entity._material.colorsChanged = false;
	}
}

VENUS.WebGLEntityRenderer.prototype.activeTextures = function() {
	var entity = this._renderableObject;
	for (var i in entity._material._textures) {
		var texture = entity._material._textures[i];
		texture.bind();
	}
};

VENUS.WebGLEntityRenderer.prototype.render = function(projectionMatrix, modelViewMatrix) {
	var gl = this._context;
	var cons = VENUS.Engine.getWebGLConstants();
	var entity = this._renderableObject;

	this._updateBuffers();

	var program = VENUS.Engine.getInstance().getResourceManager().getDefaultProgram();
	program.setUniformMatrix44("uMVMatrix", modelViewMatrix);
	program.setUniformMatrix44("uPMatrix", projectionMatrix);
	program.setUniformInt("uSampler", 0);

	this._vertexBuffer.bindDefaultProgramAttribute("aVertexPosition");
	this._textureCoordBuffer.bindDefaultProgramAttribute("aTextureCoord");

	this.activeTextures();

	this._indexBuffer.drawElements(cons.TRIANGLES);
}

