VENUS.Movable = function(matrix) {
	this.matrix = matrix;
	this.rotationMatrix = new VENUS.Matrix44();
}

VENUS.Movable.prototype.translate = function(distance, directionVec3) {
	directionVec3 = this._rotateDirectionVector(directionVec3);
	directionVec3.scale(distance);
	this.matrix.translate(directionVec3);
	return this;
}

VENUS.Movable.prototype.rotate = function(rad, axisVec3) {
	this.matrix.rotate(rad, axisVec3);
	this.rotationMatrix.rotate(rad, axisVec3);
	return this;
}

VENUS.Movable.prototype.rotateX = function(rad) {
	this.matrix.rotateX(rad);
	this.rotationMatrix.rotateX(rad);
	return this;
}

VENUS.Movable.prototype.rotateY = function(rad) {
	this.matrix.rotateY(rad);
	this.rotationMatrix.rotateY(rad);
	return this;
}

VENUS.Movable.prototype.rotateZ = function(rad) {
	this.matrix.rotateZ(rad);
	this.rotationMatrix.rotateZ(rad);
	return this;
}

VENUS.Movable.prototype.reset = function() {
	this.matrix.identity();
	return this;
}

VENUS.Movable.prototype.scale = function(vector3) {
	this.matrix.scale(vector3);
}

VENUS.Movable.prototype._rotateDirectionVector = function(dirVector3) {
	var invertRotMat = new VENUS.Matrix44();
	dirVector3.normalize();
	invertRotMat.copy(this.rotationMatrix);
	invertRotMat.invert();
	dirVector3.applyMatrix(invertRotMat);
	dirVector3.normalize();
	return dirVector3;
}
