VENUS.Animation = function() {
	this._role = null;
	this._duration = - 1;
	this._startTime = - 1;
	this._lastTime = -1;
	var engine = VENUS.Engine.getInstance();
	var userInputHelper = engine.getUserInputHelper();
	var context = this;
	var onKeyDown = function(event) {
		context._onKeyDown(event);
	};

	var onMouseMove = function(event) {
		context._onMouseMove(event);
	};

	userInputHelper.addOnKeyDownCallback(onKeyDown);
	userInputHelper.addOnMouseMoveCallback(onMouseMove);
};

VENUS.Animation.prototype.setDuration = function(duration) {
	this._duration = duration;
};

VENUS.Animation.prototype.start = function() {
	var date = new Date();
	this._startTime = date.getTime();
	this._lastTime = date.getTime();
};

VENUS.Animation.prototype.stop = function() {
	this._startTime = - 1;
	this._lastTime = -1;
};

VENUS.Animation.prototype.animate = function() {
	if (this._startTime === - 1) {
		return;
	}
	// Do animation
};

/*
 *On key down callback
 */
VENUS.Animation.prototype._onKeyDown = function(event) {

};

/*
 *on mouse move callback
 */
VENUS.Animation.prototype._onMouseMove = function(event) {

};

VENUS.Animation.prototype.setAnimationRole = function(role) {
	SharedUtil.assert(role instanceof VENUS.MovableSceneNode, "Animation role must be MovableSceneNode");
	this._role = role;
};

