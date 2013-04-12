VENUS.FPSCameraAnimation = function() {
	VENUS.Animation.call(this);
};

VENUS.FPSCameraAnimation.prototype = Object.create(VENUS.Animation.prototype);

VENUS.FPSCameraAnimation.prototype.animate = function() {

};

VENUS.FPSCameraAnimation.prototype._onKeyDown = function(event) {
	var role = this._role;
	var rotateDegree = 5;
	var distance = 0.1;
	switch (event.keyCode) {
	case VENUS.KeyCode.UpArrow:
		{
			role.rotateX(rotateDegree);
			break;
		}

	case VENUS.KeyCode.DownArrow:
		{
			role.rotateX( - rotateDegree);
			break;
		}

	case VENUS.KeyCode.LeftArrow:
		{
			var rotationMatrix = role.getRotationTransformMatrix();
			var sceneUpVector = new VENUS.Vector3(0, 1, 0);
			rotationMatrix.invert();
			sceneUpVector.applyMatrix(rotationMatrix);
			role.rotate(rotateDegree, sceneUpVector);
			break;
		}

	case VENUS.KeyCode.RightArrow:
		{
			var rotationMatrix = role.getRotationTransformMatrix();
			var sceneUpVector = new VENUS.Vector3(0, 1, 0);
			rotationMatrix.invert();
			sceneUpVector.applyMatrix(rotationMatrix);
			role.rotate( - rotateDegree, sceneUpVector);

			break;
		}

	case VENUS.KeyCode.W:
		{
			role.translate(distance, new VENUS.Vector3(0, 0, - 1));
			break;
		}

	case VENUS.KeyCode.S:
		{
			role.translate(distance, new VENUS.Vector3(0, 0, 1));
			break;
		}

	case VENUS.KeyCode.A:
		{
			role.translate(distance, new VENUS.Vector3( - 1, 0, 0));
			break;
		}

	case VENUS.KeyCode.D:
		{
			role.translate(distance, new VENUS.Vector3(1, 0, 0));
			break;
		}
	}

	document.body.webkitRequestPointerLock();
};

// TODO:
VENUS.FPSCameraAnimation.prototype._onMouseMove = function(event) {
	var role = this._role;
	var rotationMatrix = role.getRotationTransformMatrix();
	var sceneUpVector = new VENUS.Vector3(0, 1, 0);

	// compute scene up vector
	rotationMatrix.invert();
	sceneUpVector.applyMatrix(rotationMatrix);

	role.rotate( - event.webkitMovementX / 50, sceneUpVector);
	role.rotateX( - event.webkitMovementY / 50);

	document.body.webkitRequestPointerLock();
};

