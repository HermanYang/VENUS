VENUS.FPSCameraAnimation = function() {
	VENUS.Animation.call(this);

	this._speedForward = 0;
	this._speedRight = 0;
	this._speedAcceleration = 0.1;
	this._obstruction = 0.02;

	this._forwardState = VENUS.FPSCameraAnimation.NONE;
	this._rightState = VENUS.FPSCameraAnimation.NONE;

};

VENUS.FPSCameraAnimation.NONE = 0;
VENUS.FPSCameraAnimation.MOVING = 1;
VENUS.FPSCameraAnimation.RETARDING = 2;

VENUS.FPSCameraAnimation.prototype = Object.create(VENUS.Animation.prototype);

VENUS.FPSCameraAnimation.prototype.animate = function() {
	var role = this._role;

	//restrad speed
	if (this._forwardState === VENUS.FPSCameraAnimation.RETARDING) {
		if (this._speedForward > 0) {
			this._speedForward -= this._obstruction;
		}
		else if (this._speedForward < 0) {
			this._speedForward += this._obstruction;
		}

		if (this._speedForward > - 0.01 && this._speedForward < 0.01) {
			this._speedForward = 0;
		}
	}

	if (this._rightState === VENUS.FPSCameraAnimation.RETARDING) {
		if (this._speedRight > 0) {
			this._speedRight -= this._obstruction;
		}
		else if (this._speedRight < 0) {
			this._speedRight += this._obstruction;
		}

		if (this._speedRight > - 0.01 && this._speedRight < 0.01) {
			this._speedRight = 0;
		}
	}

	role.translate(this._speedForward, new VENUS.Vector3(0, 0, - 1));
	role.translate(this._speedRight, new VENUS.Vector3(1, 0, 0));
};

VENUS.FPSCameraAnimation.prototype._onKeyDown = function(event) {
	var role = this._role;
	var rotateDegree = 1;
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
			this._speedForward += this._speedAcceleration;
			this._forwardState = VENUS.FPSCameraAnimation.MOVING;

			break;
		}

	case VENUS.KeyCode.S:
		{
			this._speedForward -= this._speedAcceleration;
			this._forwardState = VENUS.FPSCameraAnimation.MOVING;

			break;
		}

	case VENUS.KeyCode.A:
		{
			this._speedRight -= this._speedAcceleration;
			this._rightState = VENUS.FPSCameraAnimation.MOVING;

			break;
		}

	case VENUS.KeyCode.D:
		{
			this._speedRight += this._speedAcceleration;
			this._rightState = VENUS.FPSCameraAnimation.MOVING;

			break;
		}

	}
};

VENUS.FPSCameraAnimation.prototype._onKeyUp = function(event) {
	switch (event.keyCode) {
	case VENUS.KeyCode.W:
	case VENUS.KeyCode.S:
		{
			this._forwardState = VENUS.FPSCameraAnimation.RETARDING;
			break;
		}
	case VENUS.KeyCode.A:
	case VENUS.KeyCode.D:
		{
			this._rightState = VENUS.FPSCameraAnimation.RETARDING;
			break;
		}
	}

};

VENUS.FPSCameraAnimation.prototype._onMouseMove = function(event) {
	var role = this._role;
	var rotationMatrix = role.getRotationTransformMatrix();
	var sceneUpVector = new VENUS.Vector3(0, 1, 0);
	var minimizeFactor = 30;

	// compute scene up vector
	rotationMatrix.invert();
	sceneUpVector.applyMatrix(rotationMatrix);

	role.rotate( - event.webkitMovementX / minimizeFactor, sceneUpVector);
	role.rotateX( - event.webkitMovementY / minimizeFactor);
};

