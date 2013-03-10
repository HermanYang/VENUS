VENUS.WebGLRenderer = function(targetCanvas) {
	this.canvas = targetCanvas;
	this.curentProgram = null;
	this._initWebGL();
	this.shaderProgramManager = new VENUS.ShaderProgramManager(this.gl);
}

// render the scene
VENUS.WebGLRenderer.prototype.renderScene = function(scene) {
	var gl = this.gl;
	var cameraNode = scene.rootSceneNode.children[1];
	gl.viewport(0, 0, this.canvas.width, this.canvas.height);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	this.renderEntity(scene.rootSceneNode.children[0], cameraNode);
	this.renderEntity(scene.rootSceneNode.children[0].children[0], cameraNode);
}

VENUS.WebGLRenderer.prototype.updateEntityBuffer = function(entity) {
	var gl = this.gl;

	var vectorDimension = 0;
	var vertices = entity.mesh.getVertices();
	var indices = entity.mesh.getIndices();
	var normals = entity.mesh.getNormals();
	var textureCoords = entity.mesh.getTextureCoords();

	var colors = entity.material.getColors();

	if (entity.mesh.vertexBufferNeedUpdate) {
		// if vertexBuffer is created before then delete it.
		if (entity.mesh.vertexBuffer != null) {
			gl.deleteBuffer(entity.mesh.vertexBuffer);
		}

		entity.mesh.vertexBuffer = gl.createBuffer();

		vectorDimension = 3;
		gl.bindBuffer(gl.ARRAY_BUFFER, entity.mesh.vertexBuffer);
		var unpackedVertices = this._unpackedVectors(vertices, vectorDimension);
		gl.bufferData(gl.ARRAY_BUFFER, new VENUS.FLOAT_ARRAY_TYPE(unpackedVertices), gl.STATIC_DRAW);
		entity.mesh.vertexBuffer.itemSize = vectorDimension;
		entity.mesh.vertexBuffer.itemAmount = vertices.length;

		entity.mesh.vertexBufferNeedUpdate = false;
	}

	if (entity.mesh.indexBufferNeedUpdate) {
		// if indexBuffer is created before then delete it.
		if (entity.mesh.indexBuffer != null) {
			gl.deleteBuffer(entity.mesh.indexBuffer);
		}

		entity.mesh.indexBuffer = gl.createBuffer();

		vectorDimension = 1;
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, entity.mesh.indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new VENUS.UNSIGNED_INT_ARRAY_TYPE(indices), gl.STATIC_DRAW);
		entity.mesh.indexBuffer.itemSize = vectorDimension;
		entity.mesh.indexBuffer.itemAmount = indices.length;

		entity.mesh.indexBufferNeedUpdate = false;
	}

	if (entity.mesh.normalBufferNeedUpdate) {
		if (entity.mesh.normalBuffer != null) {
			gl.deleteBuffer(entity.mesh.normalBuffer);
		}

		entity.mesh.normalBuffer = gl.createBuffer();

		vectorDimension = 3;
		gl.bindBuffer(gl.ARRAY_BUFFER, entity.mesh.normalBuffer);
		var unpackedNormals = this._unpackedVectors(normals, vectorDimension);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new VENUS.FLOAT_ARRAY_TYPE(unpackedNormals), gl.STATIC_DRAW);
		entity.mesh.normalBuffer.itemSize = vectorDimension;
		entity.mesh.normalBuffer.itemAmount = normals.length;

		entity.mesh.normalsBufferNeedUpdated = false;
	}

	if (entity.mesh.textureCoordBufferNeedUpdate) {
		if (entity.mesh.textureCoordBuffer != null) {
			gl.deleteBuffer(entity.mesh.textureCoordBuffer);
		}

		entity.mesh.textureCoordBuffer = gl.createBuffer();

		vectorDimension = 2;
		gl.bindBuffer(gl.ARRAY_BUFFER, entity.mesh.textureCoordBuffer);
		var unpackedTextureCoords = this._unpackedVectors(textureCoords, vectorDimension);
		gl.bufferData(gl.ARRAY_BUFFER, new VENUS.FLOAT_ARRAY_TYPE(unpackedTextureCoords), gl.STATIC_DRAW);
		entity.mesh.textureCoordBuffer.itemSize = vectorDimension;
		entity.mesh.textureCoordBuffer.itemAmount = textureCoords.length;

		entity.mesh.textureCoordBufferNeedUpdate = false;
	}

	if (entity.material.colorBufferNeedUpdate) {
		if (entity.material.colorBuffer != null) {
			gl.deleteBuffer(entity.material.colorBuffer);
		}

		entity.material.colorBuffer = gl.createBuffer();

		vectorDimension = 4;
		gl.bindBuffer(gl.ARRAY_BUFFER, entity.material.colorBuffer);
		var unpackedColors = this._unpackedVectors(colors, vectorDimension);
		gl.bufferData(gl.ARRAY_BUFFER, new VENUS.FLOAT_ARRAY_TYPE(unpackedColors), gl.STATIC_DRAW);
		entity.material.colorBuffer.itemSize = vectorDimension;
		entity.material.colorBuffer.itemAmount = colors.length;

		entity.material.colorBufferNeedUpdate = false;
	}
}

VENUS.WebGLRenderer.prototype.updateEntityTexture = function(entity) {
	var gl = this.gl;
	for (var i = 0; i < entity.material.textureBufferNeedUpdates.length; i++) {
		if (entity.material.textureBufferNeedUpdates[i]) {
			var textureBuffer = entity.material.textureBuffers[i];
			if (textureBuffer != null || textureBuffer !== undefined) {
				// delete outdated texture
				gl.deleteTexture(textureBuffer);
			}

			entity.material.textureBuffers[i] = gl.createTexture();
			textureBuffer = entity.material.textureBuffers[i];

			gl.bindTexture(gl.TEXTURE_2D, textureBuffer);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, entity.material.textures[i].image);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}
	}

}

VENUS.WebGLRenderer.prototype.renderEntity = function(entityNode, cameraNode) {
	var gl = this.gl;
	var entity = entityNode.sceneObject;

	this.updateEntityBuffer(entity);
	this.updateEntityTexture(entity);

	var shaderProgram = this.shaderProgramManager.getShaderProgram(entity.material);

	gl.bindBuffer(gl.ARRAY_BUFFER, entity.mesh.vertexBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, entity.mesh.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, entity.material.colorBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, entity.material.colorBuffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, entity.mesh.textureCoordBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexTextureCoordAttribute, entity.mesh.textureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

	var modelMatrix = new VENUS.Matrix44(entityNode.getModelMatrix());
	var viewMatrix = new VENUS.Matrix44(cameraNode.getViewMatrix());

	var modelViewMatrix = viewMatrix.multiply(modelMatrix);

	gl.uniformMatrix4fv(shaderProgram.modelViewMatrixUniform, false, modelViewMatrix.convertToGLMatrixFormat());
	gl.uniformMatrix4fv(shaderProgram.projectMatrixUniform, false, camera.projectMatrix.convertToGLMatrixFormat());
	gl.uniform1i(shaderProgram.samplerUniform, 0);

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, entity.material.textureBuffers[0]);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, entity.mesh.indexBuffer);
	gl.drawElements(gl.TRIANGLES, entity.mesh.indexBuffer.itemAmount, gl.UNSIGNED_SHORT, 0);
}

// private methods:
VENUS.WebGLRenderer.prototype._unpackedVectors = function(vectors, dimension) {
	var size = vectors.length * dimension;
	unpackedArray = new VENUS.FLOAT_ARRAY_TYPE(size);
	for (var i = 0; i < vectors.length; i++) {
		for (var j = 0; j < dimension; j++) {
			unpackedArray[i * dimension + j] = vectors[i].elements[j];
		}
	}
	return unpackedArray;
}

VENUS.WebGLRenderer.prototype._initWebGL = function() {
	try {
		this.gl = this.canvas.getContext("experimental-webgl");
		var gl = this.gl;

		// set black clear color
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.enable(gl.DEPTH_TEST);

		gl.viewport(0, 0, this.canvas.width, this.canvas.height);
	} catch(e) {
		alert("Could not initialise WebGL, sorry :-(");
	}
}

