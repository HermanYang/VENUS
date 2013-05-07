VENUS.Animation = function() {
	this._role = null;

	var engine = VENUS.Engine.getInstance();
	var userInputHelper = engine.getUserInputHelper();

	var context = this;

	var onKeyDown = function(event) {
		context._onKeyDown(event);
	};

	var onMouseMove = function(event) {
		context._onMouseMove(event);
	};

	var onKeyUp = function(event){
		context._onKeyUp(event);
	};

	userInputHelper.addOnKeyDownCallback(onKeyDown);
	userInputHelper.addOnMouseMoveCallback(onMouseMove);
	userInputHelper.addOnKeyUpCallback(onKeyUp);
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
 *On key up callback
 */
VENUS.Animation.prototype._onKeyUp = function(event) {

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

