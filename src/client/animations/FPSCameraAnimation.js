VENUS.FPSCameraAnimation = function() {
	VENUS.Animation.call(this);

	var engine = VENUS.Engine.getInstance();
	var x = engine.getCanvasWidth() / 2;
	var y = engine.getCanvasHeight() / 2;

	this._originalScreenPosition = new VENUS.Vector2(x, y);
};

VENUS.FPSCameraAnimation.prototype = Object.create(VENUS.Animation.prototype);

VENUS.FPSCameraAnimation.prototype.animate = function() {

};

VENUS.FPSCameraAnimation.prototype._onKeyDown = function(event) {
	var role = this._role;
	var rotateDegree = 5;
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
			role.rotateY(rotateDegree);
			break;
		}

	case VENUS.KeyCode.RightArrow:
		{
			role.rotateY( - rotateDegree);
			break;
		}

	case VENUS.KeyCode.W:
		{
			role.translate(1, new VENUS.Vector3(0, 0, - 1));
			break;
		}

	case VENUS.KeyCode.S:
		{
			role.translate(1, new VENUS.Vector3(0, 0, 1));
			break;
		}

	case VENUS.KeyCode.A:
		{
			role.translate(1, new VENUS.Vector3( - 1, 0, 0));
			break;
		}

	case VENUS.KeyCode.D:
		{
			role.translate(1, new VENUS.Vector3(1, 0, 0));
			break;
		}
	}

};

// TODO:
VENUS.FPSCameraAnimation.prototype._onMouseMove = function(event) {
	var role = this._role;
	var delta = new VENUS.Vector2(event.clientX, event.clientY);
	delta.subtract(this._originalScreenPosition);

	role.rotateY(-delta.getX() / 50);
	role.rotateX(-delta.getY() / 50);

	this._originalScreenPosition.setValue(event.clientX, event.clientY);

};

