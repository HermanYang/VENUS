VENUS.CubeMesh = function(lengthOfSize) {
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

	// apply size factor
	for (var i = 0; i < cubeVertices.length; i++) {
		cubeVertices[i].scale(lengthOfSize);
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

	VENUS.Mesh.call(this, cubeVertices, cubeVertexIndices, cubeNormals, cubeTextureCoords);
};

VENUS.CubeMesh.prototype = Object.create(VENUS.Mesh.prototype);

