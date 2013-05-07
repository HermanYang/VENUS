VENUS.Matrix44 = function(matrix44) {
	this._elements = mat4.create();
	if (matrix44 !== undefined && matrix44 instanceof VENUS.Matrix44) {
		mat4.copy(this._elements, matrix44.getElements());
	}
}

VENUS.Matrix44.createPerspectiveMatrix = function(fovy, aspect, near, far) {
	matrix = new VENUS.Matrix44();
	mat4.perspective(matrix.getElements(), fovy, aspect, near, far);
	return matrix;
}


VENUS.Matrix44.createOrthoMatrix = function(left, right, bottom, top, near, far) {
	matrix = new VENUS.Matrix44();
	mat4.ortho(matrix.getElements(), left, right, bottom, top, near, far);
	return matrix;
}

VENUS.Matrix44.createLookAtMatrix = function(eyePosVec3, lookAtPosVec3, upVec3) {
	matrix = new VENUS.Matrix44();
	mat4.lookAt(matrix.getElements(), eyePosVec3.getElements(), lookAtPosVec3.getElements(), upVec3.getElements());
	return matrix;
}

VENUS.Matrix44.prototype.copy = function(matrix44) {
	mat4.copy(this._elements, matrix44.getElements());
	return this;
}

VENUS.Matrix44.prototype.identity = function() {
	mat4.identity(this._elements);
	return this;
}

VENUS.Matrix44.prototype.transpose = function() {
	mat4.transpose(this._elements, this._elements);
	return this;
}

VENUS.Matrix44.prototype.invert = function() {
	mat4.invert(this._elements, this._elements);
	return this;
}

VENUS.Matrix44.prototype.determinant = function() {
	mat4.determinant(this._elements);
	return this;
}

VENUS.Matrix44.prototype.multiply = function(matrix44) {
	mat4.multiply(this._elements, this._elements, matrix44.getElements());
	return this;
}

VENUS.Matrix44.prototype.translate = function(vector3) {
	mat4.translate(this._elements, this._elements, vector3.getElements());
	return this;
}

VENUS.Matrix44.prototype.scale = function(vector3) {
	mat4.scale(this._elements, this._elements, vector3.getElements());
	return this;
}

VENUS.Matrix44.prototype.rotate = function(rad, vec3axis) {
	mat4.rotate(this._elements, this._elements, rad, vec3axis.getElements());
	return this;
}

VENUS.Matrix44.prototype.rotateX = function(rad) {
	mat4.rotateX(this._elements, this._elements, rad);
	return this;
}

VENUS.Matrix44.prototype.rotateY = function(rad) {
	mat4.rotateY(this._elements, this._elements, rad);
	return this;
}

VENUS.Matrix44.prototype.rotateZ = function(rad) {
	mat4.rotateZ(this._elements, this._elements, rad);
	return this;
}

VENUS.Matrix44.prototype.clone = function(){
	return new VENUS.Matrix44(this);
};

VENUS.Matrix44.prototype.toString = function() {
	return mat4.str(this._elements);
};

VENUS.Matrix44.prototype.getElements = function(){
	return this._elements;
};
