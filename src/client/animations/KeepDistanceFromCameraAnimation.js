VENUS.KeepDistanceFromCameraAnimation = function() {
	VENUS.Animation.call(this);

	this._originalPositionDelta = null;
};

VENUS.KeepDistanceFromCameraAnimation.prototype = Object.create(VENUS.Animation.prototype);

VENUS.KeepDistanceFromCameraAnimation.prototype.setDuration = function(duration) {
	this._duration = duration;
};

VENUS.KeepDistanceFromCameraAnimation.prototype.animate = function() {
	var role = this._role;
	var engine = VENUS.Engine.getInstance();
	var scene = engine.getSceneManager().getCurrentScene();

	// Do KeepDistanceFromCameraAnimation 
	var currentCameraNode = scene.getCurrentCameraSceneNode();

	var cameraPosition = currentCameraNode.getPosition();

	if (this._originalPositionDelta === null) {
		var currentPosition = role.getPosition();
		this._originalPositionDelta = currentPosition.subtract(cameraPosition);
		return;
	}

	var position = cameraPosition.add(this._originalPositionDelta);

	role.setPosition(position);
};
