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

VENUS.Mesh.createMeshFromObj = function(filePath) {
	var resManager = VENUS.Engine.getInstance().getResourceManager();
};

VENUS.Mesh.createCubeMesh = function(lengthOfSize) {
	var cubeVertices = [
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
		for (var i = 0; i < cubeVertices.length; i++) {
			cubeVertices[i].scale(lengthOfSize);
		}
	}

	var cubeVertexIndices = [
	0, 1, 2, 0, 2, 3, // Front face
	4, 5, 6, 4, 6, 7, // Back face
	8, 9, 10, 8, 10, 11, // Top face
	12, 13, 14, 12, 14, 15, // Bottom face
	16, 17, 18, 16, 18, 19, // Right face
	20, 21, 22, 20, 22, 23 // Left face
	];

	var cubeTextureCoords = [
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
	var cubeNormals = null;

	cubeMesh = new VENUS.Mesh();

	cubeMesh.setVertices(cubeVertices);
	cubeMesh.setIndices(cubeVertexIndices);
	cubeMesh.setTextureCoords(cubeTextureCoords);

	return cubeMesh;
}

VENUS.Mesh.prototype.render = function(modelViewMatrix) {

}

VENUS.Mesh.prototype.setVertices = function(vertices) {
	VENUS.assert(vertices !== undefined && vertices != null, "setVertices need parameters");
	this._vertices = vertices;
	this.verticesChanged = true;
	return this;
}

VENUS.Mesh.prototype.setIndices = function(indices) {
	VENUS.assert(indices !== undefined && indices != null, "setIndices need parameters");
	this._indices = indices;
	this.indicesChanged = true;
	return this;
}

VENUS.Mesh.prototype.setNormals = function(normals) {
	VENUS.assert(normals !== undefined && normals != null, "setNormals need parameters");
	this._normals = normals;
	this.normalsChanged = true;
	return this;
}

VENUS.Mesh.prototype.setTextureCoords = function(textureCoords) {
	VENUS.assert(textureCoords !== undefined && textureCoords != null, "setTextureCoords need parameters");
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
