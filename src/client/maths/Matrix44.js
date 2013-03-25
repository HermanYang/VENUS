VENUS.Matrix44 = function(matrix44) {
	this.elements = mat4.create();
	if (matrix44 !== undefined && matrix44 instanceof VENUS.Matrix44) {
		mat4.copy(this.elements, matrix44.elements);
	}
}

VENUS.Matrix44.createPerspectiveMatrix = function(fovy, aspect, near, far) {
	matrix = new VENUS.Matrix44();
	mat4.perspective(matrix.elements, fovy, aspect, near, far);
	return matrix;
}

VENUS.Matrix44.createOrthoMatrix = function(left, right, bottom, top, near, far) {
	matrix = new VENUS.Matrix44();
	mat4.ortho(matrix.elements, left, right, bottom, top, near, far);
	return matrix;
}

VENUS.Matrix44.createLookAtMatrix = function(eyePosVec3, lookAtPosVec3, upVec3) {
	matrix = new VENUS.Matrix44();
	mat4.lookAt(matrix.elements, eyePosVec3.elements, lookAtPosVec3.elements, upVec3.elements);
	return matrix;
}

VENUS.Matrix44.prototype.copy = function(matrix44) {
	mat4.copy(this.elements, matrix44.elements);
	return this;
}

VENUS.Matrix44.prototype.identity = function() {
	mat4.identity(this.elements);
	return this;
}

VENUS.Matrix44.prototype.transpose = function() {
	mat4.transpose(this.elements, this.elements);
	return this;
}

VENUS.Matrix44.prototype.invert = function() {
	mat4.invert(this.elements, this.elements);
	return this;
}

VENUS.Matrix44.prototype.determinant = function() {
	mat4.determinant(this.elements);
	return this;
}

VENUS.Matrix44.prototype.multiply = function(matrix44) {
	mat4.multiply(this.elements, this.elements, matrix44.elements);
	return this;
}

VENUS.Matrix44.prototype.translate = function(vector3) {
	mat4.translate(this.elements, this.elements, vector3.elements);
	return this;
}

VENUS.Matrix44.prototype.scale = function(vector3) {
	mat4.scale(this.elements, this.elements, vector3.elements);
	return this;
}

VENUS.Matrix44.prototype.rotate = function(rad, vec3axis) {
	mat4.rotate(this.elements, this.elements, rad, vec3axis.elements);
	return this;
}

VENUS.Matrix44.prototype.rotateX = function(rad) {
	mat4.rotateX(this.elements, this.elements, rad);
	return this;
}

VENUS.Matrix44.prototype.rotateY = function(rad) {
	mat4.rotateY(this.elements, this.elements, rad);
	return this;
}

VENUS.Matrix44.prototype.rotateZ = function(rad) {
	mat4.rotateZ(this.elements, this.elements, rad);
	return this;
}

VENUS.Matrix44.prototype.toString = function() {
	return mat4.str(this.elements);
}

VENUS.Matrix44.prototype.convertToGLMatrixFormat = function() {
	return this.elements;
}

