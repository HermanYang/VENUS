VENUS.StraightForwardAnimation = function() {
	VENUS.Animation.call(this);
	this._direction = new VENUS.Vector3(0, 0, 0);
	this._speed = 0;
};

VENUS.StraightForwardAnimation.prototype = Object.create(VENUS.Animation.prototype);

VENUS.StraightForwardAnimation.prototype.setDirection = function(direction) {
	this._direction = direction;
};

VENUS.StraightForwardAnimation.prototype.setSpeed = function(speed) {
	this._speed = speed;
};

VENUS.StraightForwardAnimation.prototype.animate = function() {
	if (this._startTime === - 1) {
		return;
	}
	// Do StraightFowardAnimation
	var date = new Date();
	var now = date.getTime();
	var elapse = now - this._startTime;
	if (elapse > this._duration) {
		return;
	}

	var delta = now - this._lastTime;
	var role = this._role;

	role.translate(this._speed * delta, this._direction);
	this._lastTime = now;
};

