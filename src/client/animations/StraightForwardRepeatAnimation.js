VENUS.StraightForwardRepeatAnimation = function() {
	VENUS.Animation.call(this);

	this._direction = null;
	this._originalPosition = null;

	this._speed = 0;
	this._originalSpeed = 0;

	this._startTime = - 1;
	this._lastTime = - 1;
	this._timeToPlay = 3000;

	this._acceleration = 0;

	this._maxSpeed = 1;

};

VENUS.StraightForwardRepeatAnimation.prototype = Object.create(VENUS.Animation.prototype);

VENUS.StraightForwardRepeatAnimation.prototype.setPlayTime = function(timeToPlay) {
	this._timeToPlay = timeToPlay;
};

VENUS.StraightForwardRepeatAnimation.prototype.setSpeed = function(speed) {
	this._speed = speed;
	this._originalSpeed = speed;
};

VENUS.StraightForwardRepeatAnimation.prototype.setMaxSpeed = function(maxSpeed) {
	this._maxSpeed = maxSpeed;
};

VENUS.StraightForwardRepeatAnimation.prototype.setAcceleration = function(acceleration) {
	this._acceleration = acceleration;
};

VENUS.StraightForwardRepeatAnimation.prototype._createDirection = function() {
	var x = VENUS.Math.random( - 1, 1);
	var y = VENUS.Math.random( - 1, 1);
	var z = VENUS.Math.random( - 1, 1);

	return new VENUS.Vector3(x, y, z);
};

VENUS.StraightForwardRepeatAnimation.prototype.animate = function() {
	var role = this._role;

	if (this._startTime === - 1) {
		this._startTime = SharedUtil.getCurrentTime();
	}

	if (this._lastTime === - 1) {
		this._lastTime = SharedUtil.getCurrentTime();
	}

	if (this._originalPosition === null) {
		this._originalPosition = role.getPosition();
	}

	if (this._direction === null) {
		this._direction = this._createDirection();
		
		if (role instanceof VENUS.ParticleEmmiterSceneNode) {
			var particleDirection = this._direction.clone();
			particleDirection.negate();
			role.setDirection(particleDirection);
		}
	}

	// Do StraightFowardAnimation
	var now = SharedUtil.getCurrentTime();

	var elapse = now - this._startTime;

	// replay
	if (elapse > this._timeToPlay) {
		this._startTime = SharedUtil.getCurrentTime();
		this._lastTime = SharedUtil.getCurrentTime();

		this._speed = this._originalSpeed;

		this._direction = this._createDirection();

		if (role instanceof VENUS.ParticleEmmiterSceneNode) {
			var particleDirection = this._direction.clone();
			particleDirection.negate();
			role.setDirection(particleDirection);
		}

		role.setPosition(this._originalPosition.clone());
		return;
	}

	var delta = now - this._lastTime;

	role.translate(this._speed * delta, this._direction.clone());

	if (this._speed < this._maxSpeed) {
		this._speed += this._acceleration;
	}

	this._lastTime = now;
};

