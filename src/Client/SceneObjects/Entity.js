VENUS.Entity = function(mesh, material) {
	VENUS.RenderabelObject.call(this);

	this.mesh = mesh;
	this.material = material;	
};

// inherit from RenderabelObject
VENUS.Entity.prototype = Object.create(VENUS.RenderabelObject.prototype);

VENUS.Entity.prototype._updateBuffers = function() {
	var gl = VENUS.Engine.getInstance().getContext();

	var vectorDimension = 0;
	var vertices = this.mesh.getVertices();
	var indices = this.mesh.getIndices();
	var normals = this.mesh.getNormals();
	var textureCoords = this.mesh.getTextureCoords();

	var colors = this.material.getColors();

	var vertexBufferNeedUpdate = this.mesh.vertexBufferNeedUpdate;
	var indexBufferNeedUpdate = this.mesh.indexBufferNeedUpdate;
	var normalBufferNeedUpdate = this.mesh.normalBufferNeedUpdate;
	var textureCoordBufferNeedUpdate = this.mesh.textureCoordBufferNeedUpdate;
	var colorBufferNeedUpdate = this.material.colorBufferNeedUpdate;

	if (vertexBufferNeedUpdate) {
		// if vertexBuffer is created before then delete it.
		if (this.mesh.vertexBuffer != null) {
			gl.deleteBuffer(this.mesh.vertexBuffer);
		}

		this.mesh.vertexBuffer = gl.createBuffer();

		vectorDimension = 3;
		gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.vertexBuffer);
		var unpackedVertices = VENUS.unpackedVectors(vertices, vectorDimension);
		gl.bufferData(gl.ARRAY_BUFFER, new VENUS.FLOAT_ARRAY_TYPE(unpackedVertices), gl.STATIC_DRAW);
		this.mesh.vertexBuffer.itemSize = vectorDimension;
		this.mesh.vertexBuffer.itemAmount = vertices.length;

		this.mesh.vertexBufferNeedUpdate = false;
	}

	if (indexBufferNeedUpdate) {
		// if indexBuffer is created before then delete it.
		if (this.mesh.indexBuffer != null) {
			gl.deleteBuffer(this.mesh.indexBuffer);
		}

		this.mesh.indexBuffer = gl.createBuffer();

		vectorDimension = 1;
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mesh.indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new VENUS.UNSIGNED_INT_ARRAY_TYPE(indices), gl.STATIC_DRAW);
		this.mesh.indexBuffer.itemSize = vectorDimension;
		this.mesh.indexBuffer.itemAmount = indices.length;

		this.mesh.indexBufferNeedUpdate = false;
	}

	if (normalBufferNeedUpdate) {
		if (this.mesh.normalBuffer != null) {
			gl.deleteBuffer(this.mesh.normalBuffer);
		}

		this.mesh.normalBuffer = gl.createBuffer();

		vectorDimension = 3;
		gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.normalBuffer);
		var unpackedNormals = VENUS.unpackedVectors(normals, vectorDimension);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new VENUS.FLOAT_ARRAY_TYPE(unpackedNormals), gl.STATIC_DRAW);
		this.mesh.normalBuffer.itemSize = vectorDimension;
		this.mesh.normalBuffer.itemAmount = normals.length;

		this.mesh.normalsBufferNeedUpdated = false;
	}

	if (textureCoordBufferNeedUpdate) {
		if (this.mesh.textureCoordBuffer != null) {
			gl.deleteBuffer(this.mesh.textureCoordBuffer);
		}

		this.mesh.textureCoordBuffer = gl.createBuffer();

		vectorDimension = 2;
		gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.textureCoordBuffer);
		var unpackedTextureCoords = VENUS.unpackedVectors(textureCoords, vectorDimension);
		gl.bufferData(gl.ARRAY_BUFFER, new VENUS.FLOAT_ARRAY_TYPE(unpackedTextureCoords), gl.STATIC_DRAW);
		this.mesh.textureCoordBuffer.itemSize = vectorDimension;
		this.mesh.textureCoordBuffer.itemAmount = textureCoords.length;

		this.mesh.textureCoordBufferNeedUpdate = false;
	}

	if (colorBufferNeedUpdate) {
		if (this.material.colorBuffer != null) {
			gl.deleteBuffer(this.material.colorBuffer);
		}

		this.material.colorBuffer = gl.createBuffer();

		vectorDimension = 4;
		gl.bindBuffer(gl.ARRAY_BUFFER, this.material.colorBuffer);
		var unpackedColors = VENUS.unpackedVectors(colors, vectorDimension);
		gl.bufferData(gl.ARRAY_BUFFER, new VENUS.FLOAT_ARRAY_TYPE(unpackedColors), gl.STATIC_DRAW);
		this.material.colorBuffer.itemSize = vectorDimension;
		this.material.colorBuffer.itemAmount = colors.length;

		this.material.colorBufferNeedUpdate = false;
	}
}

VENUS.Entity.prototype._updateTextures = function() {
	var gl = VENUS.Engine.getInstance().getContext();
	for (var i = 0; i < this.material.textureBufferNeedUpdates.length; i++) {
		if (this.material.textureBufferNeedUpdates[i]) {
			var textureBuffer = this.material.textureBuffers[i];
			if (textureBuffer != null || textureBuffer !== undefined) {
				// delete outdated texture
				gl.deleteTexture(textureBuffer);
			}

			this.material.textureBuffers[i] = gl.createTexture();
			textureBuffer = this.material.textureBuffers[i];

			gl.bindTexture(gl.TEXTURE_2D, textureBuffer);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.material.textures[i].image);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}
	}
}

VENUS.Entity.prototype.render = function(projectMatrix, modelViewMatrix) {
	var gl = VENUS.Engine.getInstance().getContext();
	var resManager = VENUS.Engine.getInstance().getResourceManager();

	this._updateBuffers();
	this._updateTextures();
	var program = VENUS.Engine.getInstance().getResourceManager().getDefaultProgram();
		program.setUniformMatrix44("uMVMatrix", modelViewMatrix); 
	program.setUniformMatrix44("uPMatrix", projectMatrix); 
	program.setUniformInt("uSampler", 0);
	
	program.setAttribute("aVertexPosition", this.mesh.vertexBuffer, this.mesh.vertexBuffer.itemSize);
	program.setAttribute("aVertexColor", this.material.colorBuffer, this.material.colorBuffer.itemSize);
	program.setAttribute("aTextureCoord", this.mesh.textureCoordBuffer, this.mesh.textureCoordBuffer.itemSize);

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, this.material.textureBuffers[0]);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mesh.indexBuffer);
	gl.drawElements(gl.TRIANGLES, this.mesh.indexBuffer.itemAmount, gl.UNSIGNED_SHORT, 0);

}

