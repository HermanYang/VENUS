VENUS.CameraSceneNode = function(camera) {
	if (! (camera instanceof VENUS.Camera) || camera === undefined ) {
		alert("CameraSceneNode should attach a Camera type!");
	}

	VENUS.MovableSceneNode.call(this, camera);

	this.relativeTransformMatrix = VENUS.Matrix44.createLookAtMatrix(new VENUS.Vector3(0, 0, 0), new VENUS.Vector3(0, 0, - 1), new VENUS.Vector3(0, 1, 0));
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

