VENUS.StraightForwardAnimation = function() {
	VENUS.Animation.call(this);

	this._direction = new VENUS.Vector3(0, 0, 1);
	this._speed = 0;

	this._startTime = -1;
	this._lastTime = -1;
	this._duration = -1;

	this._acceleration = 0;
};

VENUS.StraightForwardAnimation.prototype = Object.create(VENUS.Animation.prototype);

VENUS.StraightForwardAnimation.prototype.setDirection = function(direction) {
	this._direction = direction;
};

VENUS.StraightForwardAnimation.prototype.setDuration = function(duration){
	this._duration = duration;
};

VENUS.StraightForwardAnimation.prototype.setSpeed = function(speed) {
	this._speed = speed;
};

VENUS.StraightForwardAnimation.prototype.setAcceleration = function(acceleration) {
	this._acceleration = acceleration;
};

VENUS.StraightForwardAnimation.prototype.animate = function() {
	var role = this._role;

	if(this._startTime === -1){
		this._startTime = SharedUtil.getCurrentTime();
	}

	if(this._lastTime === -1){
		this._lastTime = SharedUtil.getCurrentTime();
	}

	// Do StraightFowardAnimation
	var now = SharedUtil.getCurrentTime();

	var elapse = now - this._startTime;

	if (this._duration > 0 && elapse > this._duration) {
		return;
	}

	var delta = now - this._lastTime;

	role.translate(this._speed * delta, this._direction.clone());

	this._speed += this._acceleration;
	this._lastTime = now;
};

