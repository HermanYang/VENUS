/*
 *Mesh contains the vertex all the message 
 *includes vertex position, vertex color, vertex texture coordination
 *as well as the buffers of the vertex message
 */
VENUS.Mesh = function() {
	this._vertices = null;
	this._indices = null;
	this._normals = null;
	this._textureCoords = null;

	this.verticesChanged = false;
	this.indicesChanged = false;
	this.normalsChanged = false;
	this.textureCoordsChanged = false;
};

VENUS.Mesh.createMeshFromModel = function(filePath) {
	var resManager = VENUS.Engine.getInstance().getResourceManager();
	var model = resManager.getModelByPath(filePath);
	SharedUtil.assert(model !== undefined, filePath + " is not a model");

	var vertices = [];
	var indices = [];
	var textureCoords = [];
	var normals = [];

	// parse vertices
	for (var i = 0; i < model.vertices.length; i += 3) {
		vertices.push(new VENUS.Vector3(model.vertices[i], model.vertices[i + 1], model.vertices[i + 2]));
	}

	// parse normals 
	for (var i = 0; i < model.normals.length; i += 3) {
		normals.push(new VENUS.Vector3(model.normals[i], model.normals[i + 1], model.normals[i + 2]));
	}

	// parse indices
	for (var i in model.indices) {
		indices[i] = model.indices[i];
	}

	// parse textureCoords
	for (var j = 0; j < model.textureCoords.length; j += 2) {
		textureCoords.push(new VENUS.Vector2(model.normals[j], model.normals[j + 1]));
	}

	mesh = new VENUS.Mesh();

	mesh.setVertices(vertices);
	mesh.setIndices(indices);
	mesh.setNormals(normals);
	mesh.setTextureCoords(textureCoords);

	return mesh;
};

VENUS.Mesh.createCubeMesh = function(lengthOfSize) {
	var vertices = [
	// Front face
	new VENUS.Vector3( - 1.0, - 1.0, 1.0), new VENUS.Vector3(1.0, - 1.0, 1.0), new VENUS.Vector3(1.0, 1.0, 1.0), new VENUS.Vector3( - 1.0, 1.0, 1.0),

	// Back face
	new VENUS.Vector3( - 1.0, - 1.0, - 1.0), new VENUS.Vector3( - 1.0, 1.0, - 1.0), new VENUS.Vector3(1.0, 1.0, - 1.0), new VENUS.Vector3(1.0, - 1.0, - 1.0),

	// Top face
	new VENUS.Vector3( - 1.0, 1.0, - 1.0), new VENUS.Vector3( - 1.0, 1.0, 1.0), new VENUS.Vector3(1.0, 1.0, 1.0), new VENUS.Vector3(1.0, 1.0, - 1.0),

	// Bottom face
	new VENUS.Vector3( - 1.0, - 1.0, - 1.0), new VENUS.Vector3(1.0, - 1.0, - 1.0), new VENUS.Vector3(1.0, - 1.0, 1.0), new VENUS.Vector3( - 1.0, - 1.0, 1.0),

	// Right face
	new VENUS.Vector3(1.0, - 1.0, - 1.0), new VENUS.Vector3(1.0, 1.0, - 1.0), new VENUS.Vector3(1.0, 1.0, 1.0), new VENUS.Vector3(1.0, - 1.0, 1.0),

	// Left face
	new VENUS.Vector3( - 1.0, - 1.0, - 1.0), new VENUS.Vector3( - 1.0, - 1.0, 1.0), new VENUS.Vector3( - 1.0, 1.0, 1.0), new VENUS.Vector3( - 1.0, 1.0, - 1.0)];

	if (lengthOfSize !== undefined) {
		// apply size factor
		for (var i = 0; i < vertices.length; i++) {
			vertices[i].scale(lengthOfSize);
		}
	}

	var indices = [
	0, 1, 2, 0, 2, 3, // Front face
	4, 5, 6, 4, 6, 7, // Back face
	8, 9, 10, 8, 10, 11, // Top face
	12, 13, 14, 12, 14, 15, // Bottom face
	16, 17, 18, 16, 18, 19, // Right face
	20, 21, 22, 20, 22, 23 // Left face
	];

	var textureCoords = [
	// Front face
	new VENUS.Vector2(0.0, 0.0), new VENUS.Vector2(1.0, 0.0), new VENUS.Vector2(1.0, 1.0), new VENUS.Vector2(0.0, 1.0),

	// Back face
	new VENUS.Vector2(1.0, 0.0), new VENUS.Vector2(1.0, 1.0), new VENUS.Vector2(0.0, 1.0), new VENUS.Vector2(0.0, 0.0),

	// Top face
	new VENUS.Vector2(0.0, 1.0), new VENUS.Vector2(0.0, 0.0), new VENUS.Vector2(1.0, 0.0), new VENUS.Vector2(1.0, 1.0),

	// Bottom face
	new VENUS.Vector2(1.0, 1.0), new VENUS.Vector2(0.0, 1.0), new VENUS.Vector2(0.0, 0.0), new VENUS.Vector2(1.0, 0.0),

	// Right face
	new VENUS.Vector2(1.0, 0.0), new VENUS.Vector2(1.0, 1.0), new VENUS.Vector2(0.0, 1.0), new VENUS.Vector2(0.0, 0.0),

	// Left face
	new VENUS.Vector2(0.0, 0.0), new VENUS.Vector2(1.0, 0.0), new VENUS.Vector2(1.0, 1.0), new VENUS.Vector2(0.0, 1.0)];

	var normals = [
	// Front face
	new VENUS.Vector3(0.0, 0.0, 1.0), new VENUS.Vector3(0.0, 0.0, 1.0), new VENUS.Vector3(0.0, 0.0, 1.0), new VENUS.Vector3(0.0, 0.0, 1.0),

	// Back face
	new VENUS.Vector3(0.0, 0.0, - 1.0), new VENUS.Vector3(0.0, 0.0, - 1.0), new VENUS.Vector3(0.0, 0.0, - 1.0), new VENUS.Vector3(0.0, 0.0, - 1.0),

	// Top face
	new VENUS.Vector3(0.0, 1.0, 0.0), new VENUS.Vector3(0.0, 1.0, 0.0), new VENUS.Vector3(0.0, 1.0, 0.0), new VENUS.Vector3(0.0, 1.0, 0.0),

	// Bottom face
	new VENUS.Vector3(0.0, - 1.0, 0.0), new VENUS.Vector3(0.0, - 1.0, 0.0), new VENUS.Vector3(0.0, - 1.0, 0.0), new VENUS.Vector3(0.0, - 1.0, 0.0),

	// Right face
	new VENUS.Vector3(1.0, 0.0, 0.0), new VENUS.Vector3(1.0, 0.0, 0.0), new VENUS.Vector3(1.0, 0.0, 0.0), new VENUS.Vector3(1.0, 0.0, 0.0),

	// Left face
	new VENUS.Vector3( - 1.0, 0.0, 0.0), new VENUS.Vector3( - 1.0, 0.0, 0.0), new VENUS.Vector3( - 1.0, 0.0, 0.0), new VENUS.Vector3( - 1.0, 0.0, 0.0), ];

	mesh = new VENUS.Mesh();

	mesh.setVertices(vertices);
	mesh.setNormals(normals);
	mesh.setIndices(indices);
	mesh.setTextureCoords(textureCoords);

	return mesh;
}

VENUS.Mesh.createSphereMesh = function(radius, latitudeBands, longitudeBands) {
	var vertices = [];
	var normals = [];
	var textureCoords = [];
	var indices = [];

	for (var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
		var theta = latNumber * Math.PI / latitudeBands;
		var sinTheta = Math.sin(theta);
		var cosTheta = Math.cos(theta);

		for (var longNumber = 0; longNumber <= longitudeBands; longNumber++) {
			var phi = longNumber * 2 * Math.PI / longitudeBands;
			var sinPhi = Math.sin(phi);
			var cosPhi = Math.cos(phi);

			var x = cosPhi * sinTheta;
			var y = cosTheta;
			var z = sinPhi * sinTheta;

			var u = 1 - (longNumber / longitudeBands);
			var v = 1 - (latNumber / latitudeBands);

			normals.push(new VENUS.Vector3(x, y, z));
			textureCoords.push(new VENUS.Vector2(u, v));
			vertices.push(new VENUS.Vector3(radius * x, radius * y, radius * z));
		}
	}

	for (var latNumber = 0; latNumber < latitudeBands; latNumber++) {
		for (var longNumber = 0; longNumber < longitudeBands; longNumber++) {
			var first = (latNumber * (longitudeBands + 1)) + longNumber;
			var second = first + longitudeBands + 1;
			indices.push(first);
			indices.push(second);
			indices.push(first + 1);

			indices.push(second);
			indices.push(second + 1);
			indices.push(first + 1);
		}
	}

	var mesh = new VENUS.Mesh();

	mesh.setVertices(vertices);
	mesh.setNormals(normals);
	mesh.setTextureCoords(textureCoords);
	mesh.setIndices(indices);

	return mesh;
};

VENUS.Mesh.prototype.setVertices = function(vertices) {
	SharedUtil.assert(vertices !== undefined && vertices != null, "setVertices need parameters");
	this._vertices = vertices;
	this.verticesChanged = true;
	return this;
}

VENUS.Mesh.prototype.setIndices = function(indices) {
	SharedUtil.assert(indices !== undefined && indices != null, "setIndices need parameters");
	this._indices = indices;
	this.indicesChanged = true;
	return this;
}

VENUS.Mesh.prototype.setNormals = function(normals) {
	SharedUtil.assert(normals !== undefined && normals != null, "setNormals need parameters");
	this._normals = normals;
	this.normalsChanged = true;
	return this;
}

VENUS.Mesh.prototype.setTextureCoords = function(textureCoords) {
	SharedUtil.assert(textureCoords !== undefined && textureCoords != null, "setTextureCoords need parameters");
	this._textureCoords = textureCoords;
	this.textureCoordsChanged = true;
	return this;
}

VENUS.Mesh.prototype.getVertices = function() {
	return this._vertices;
}

VENUS.Mesh.prototype.getIndices = function() {
	return this._indices;
}

VENUS.Mesh.prototype.getNormals = function() {
	return this._normals;
}

VENUS.Mesh.prototype.getTextureCoords = function() {
	return this._textureCoords;
}

