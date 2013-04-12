VENUS.CameraSceneNode = function(camera, position, lookAtDirection, upDirection) {
	if (camera !== undefined) {
		SharedUtil.assert(camera instanceof VENUS.Camera, "CameraSceneNode can just attach with camera");
	}

	VENUS.MovableSceneNode.call(this, camera);

	this._position = position;
	this._lookAtDirection = lookAtDirection;
	this._upDirection = upDirection;

	this._relativeTransformMatrix = VENUS.Matrix44.createLookAtMatrix(position, lookAtDirection, upDirection);
};

VENUS.CameraSceneNode.prototype = Object.create(VENUS.MovableSceneNode.prototype);

VENUS.CameraSceneNode.prototype.getViewMatrix = function() {
	var transformMatrix = this.getTransformMatrix();
	transformMatrix.invert();
	return transformMatrix;
};

VENUS.CameraSceneNode.prototype.getProjectionMatrix = function() {
	return this._sceneObject.getProjectionMatrix();
};

VENUS.CameraSceneNode.prototype.getLookAtDirection = function() {
	var lookAtDirection = this._lookAtDirection.clone();
	lookAtDirection.applyMatrix(this._relativeRotationMatrix);
};

