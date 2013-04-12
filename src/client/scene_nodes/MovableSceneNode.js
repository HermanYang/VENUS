VENUS.MovableSceneNode = function(object) {
	VENUS.SceneNode.call(this, object);

	this._relativeTransformMatrix = new VENUS.Matrix44();
	this._relativeRotationMatrix = new VENUS.Matrix44(); //just used to record the rotation of a object
	this._position = new VENUS.Vector3(0, 0, 0);

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

VENUS.MovableSceneNode.prototype.getPosition = function() {
	return this._position.clone();
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
	// do rotation
	var rad = VENUS.Math.degreeToRadian(degree);
	this._relativeTransformMatrix.rotateX(rad);

	// update relativeRotationMatrix
	this._relativeRotationMatrix.rotateX(rad);
};

VENUS.MovableSceneNode.prototype.rotateY = function(degree) {
	// do rotation
	var rad = VENUS.Math.degreeToRadian(degree);
	this._relativeTransformMatrix.rotateY(rad);

	// update relativeRotationMatrix
	this._relativeRotationMatrix.rotateY(rad);
};

VENUS.MovableSceneNode.prototype.rotateZ = function(degree) {
	// do rotation
	var rad = VENUS.Math.degreeToRadian(degree);
	this._relativeTransformMatrix.rotateZ(rad);

	// update relativeRotationMatrix
	this._relativeRotationMatrix.rotateZ(rad);
};

// get the finnal transform matrix
VENUS.MovableSceneNode.prototype.getRotationTransformMatrix = function() {
	var rotationMatrix = new VENUS.Matrix44(this._relativeRotationMatrix);
	if (this._parent !== undefined && this._parent != null && this._parent instanceof VENUS.MovableSceneNode) {
		rotationMatrix.multiply(this._parent.getRotationTransformMatrix());
	}

	return rotationMatrix;
};

// get the finnal transform matrix includes rotation and translation transform
VENUS.MovableSceneNode.prototype.getTransformMatrix = function() {
	var transformMatrix = new VENUS.Matrix44(this._relativeTransformMatrix);
	if (this._parent !== undefined && this._parent != null && this._parent instanceof VENUS.MovableSceneNode) {
		transformMatrix.multiply(this._parent.getTransformMatrix());
	}

	return transformMatrix;
};

VENUS.MovableSceneNode.prototype.addAnimation = function(animation) {
	this._animationList.push(animation);
	animation.setAnimationRole(this);
};

VENUS.MovableSceneNode.prototype._animate = function() {
	for (var i = 0; i < this._animationList.length; ++i) {
		this._animationList[i].animate();
	}
};

VENUS.MovableSceneNode.prototype.startAnimation = function() {
	for (var i = 0; i < this._animationList.length; ++i) {
		this._animationList[i].start();
	}
};

