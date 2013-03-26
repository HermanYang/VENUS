VENUS.MovableSceneNode = function(object) {	
	VENUS.SceneNode.call(this, object);

	this.relativeTransformMatrix = new VENUS.Matrix44();
	this.relativeRotationMatrix = new VENUS.Matrix44(); //just used to record the rotation of a object

	this.position = new VENUS.Vector3(0, 0, 0);
}

VENUS.MovableSceneNode.prototype = Object.create(VENUS.SceneNode.prototype);

VENUS.MovableSceneNode.prototype.setPosition = function(posVector3) {
	// update position
	this.position = posVector3;

	// do tanslation
	var dis = this.position.distance(posVector3);
	var dir = posVector3.subtract(this.position);
	this.translate(dis, dir);
}

VENUS.MovableSceneNode.prototype.translate = function(distance, dirVector3) {
	// do translation
	dirVector3.normalize();
	var tranVec3 = dirVector3.scale(distance);
	this.relativeTransformMatrix.translate(tranVec3);

	// update position
	dirVector3.scale(distance);
	this.position.add(dirVector3);
	return this;
}

VENUS.MovableSceneNode.prototype.rotate = function(degree, axisVector3) {
	// do rotation
	var rad = VENUS.Math.degreeToRadian(degree);
	this.relativeTransformMatrix.rotate(rad, axisVector3);
	
	// update relativeRotationMatrix
	this.relativeRotationMatrix.rotate(rad, axisVector3);
	return this;
}

VENUS.MovableSceneNode.prototype.rotateY = function(degree) {
	this.rotate(degree, new VENUS.Vector3(0, 1, 0));
	return this;
}

// get the finnal transform matrix
VENUS.MovableSceneNode.prototype.getRotationTransformMatrix = function() {
	var rotationMatrix = new VENUS.Matrix44(this.relativeRotationMatrix);
	if (this._parent !== undefined && this._parent != null && this._parent instanceof VENUS.MovableSceneNode) {
		rotationMatrix.multiply(this._parent.getRotationTransformMatrix());
	}

	return rotationMatrix;
}

// get the finnal transform matrix includes rotation and translation transform
VENUS.MovableSceneNode.prototype.getTransformMatrix = function() {
	var transformMatrix = new VENUS.Matrix44(this.relativeTransformMatrix);
	if (this._parent !== undefined && this._parent != null && this._parent instanceof VENUS.MovableSceneNode) {
		transformMatrix.multiply(this._parent.getTransformMatrix());
	}

	return transformMatrix;
}
