VENUS.MovableSceneNode = function(object) {
	VENUS.SceneNode.call(this, object);

	this._relativeTransformMatrix = new VENUS.Matrix44();
	this._relativeRotationMatrix = new VENUS.Matrix44(); //just used to record the rotation of a object
	this._position = new VENUS.Vector3(0, 0, 0);
	this._relativePosition = new VENUS.Vector3(0, 0, 0);

	this._animationList = [];
};

VENUS.MovableSceneNode.prototype = Object.create(VENUS.SceneNode.prototype);

VENUS.MovableSceneNode.prototype.setPosition = function(posVector3) {
	// make a copy of position
	var position = this._position.clone();

	// do tanslation
	var dis = position.distance(posVector3);
	var dir = posVector3.subtract(position);

	this.translate(dis, dir);
};

VENUS.MovableSceneNode.prototype.setForwardDirection = function(forwardDirection) {
	var originalDirection = new VENUS.Vector3(0, 0, 1);
	var cosDegree = originalDirection.dot(forwardDirection.normalize());
	var degree = VENUS.Math.arccos(cosDegree);
	var axis = originalDirection.cross(forwardDirection);

	this._relativeTransformMatrix.identity();
	this._relativeRotationMatrix.identity();

	var targetPosition = this._position.clone();
	this._position.setValue(0, 0, 0); 
	this.setPosition(targetPosition);
	this._relativeTransformMatrix.rotate(degree, axis);

};

VENUS.MovableSceneNode.prototype.getCurentDirection = function(){
	var originalDirection = new VENUS.Vector3(0, 0, 1);
	originalDirection.applyMatrix(this._relativeRotationMatrix);
	return originalDirection;
}

VENUS.MovableSceneNode.prototype.getPosition = function() {
	return this._position.clone();
};

VENUS.MovableSceneNode.prototype.getAbsolutePosition = function(){
	var absulutePosition = new VENUS.Vector3(0, 0, 0);
	var transform = this.getTransformMatrix();
	absulutePosition.applyMatrix(transform);
	return absulutePosition;
};

/*
 *direction vector is in the local coordination
 */
VENUS.MovableSceneNode.prototype.translate = function(distance, dirVector3) {
	// do translation
	dirVector3.normalize();
	var tranVec3 = dirVector3.scale(distance);

	this._relativeTransformMatrix.translate(tranVec3);

	// adjust the translation direction vector affected by rotation
	tranVec3.applyMatrix(this._relativeRotationMatrix);

	// update position
	this._position.add(tranVec3);

};

VENUS.MovableSceneNode.prototype.rotate = function(degree, axisVector3) {
	// do rotation
	var rad = VENUS.Math.degreeToRadian(degree);
	this._relativeTransformMatrix.rotate(rad, axisVector3);

	// update relativeRotationMatrix
	this._relativeRotationMatrix.rotate(rad, axisVector3);
};

VENUS.MovableSceneNode.prototype.rotateX = function(degree) {
	this.rotate(degree, new VENUS.Vector3(1, 0, 0));
};

VENUS.MovableSceneNode.prototype.rotateY = function(degree) {
	this.rotate(degree, new VENUS.Vector3(0, 1, 0));
};

VENUS.MovableSceneNode.prototype.rotateZ = function(degree) {
	this.rotate(degree, new VENUS.Vector3(0, 0, 1));
};

// get the finnal transform matrix
VENUS.MovableSceneNode.prototype.getRotationTransformMatrix = function() {
	var rotationMatrix = this._relativeRotationMatrix.clone();

	if (this._parent !== undefined && this._parent != null && this._parent instanceof VENUS.MovableSceneNode) {
		rotationMatrix.multiply(this._parent.getRotationTransformMatrix());
	}

	return rotationMatrix;
};

// get the finnal transform matrix includes rotation and translation transform
VENUS.MovableSceneNode.prototype.getTransformMatrix = function() {

	var transformMatrix = this._relativeTransformMatrix.clone();

	if (this._parent !== undefined && this._parent != null && this._parent instanceof VENUS.MovableSceneNode) {
		var parentTransformMatrix = this._parent.getTransformMatrix();

		parentTransformMatrix.multiply(transformMatrix);

		transformMatrix = parentTransformMatrix;
	}

	return transformMatrix;
};

VENUS.MovableSceneNode.prototype.addAnimation = function(animation) {
	this._animationList.push(animation);
	animation.setAnimationRole(this);
};

VENUS.MovableSceneNode.prototype.animate = function() {
	for (var i = 0; i < this._animationList.length; ++i) {
		this._animationList[i].animate();
	}
};

