VENUS.GoAndReturnAnimation = function() {
	VENUS.Animation.call(this);

	this._direction = new VENUS.Vector3(0, 0, 1);
	this._speed = 0;

	this._startTime = - 1;
	this._lastTime = - 1;
	this._duration = - 1;

	this._acceleration = 0;

	this._autoChangeDirectionDelay = 2000; 
	this._delayElapse = 0;

	this._State = VENUS.GoAndReturnAnimation.GO;

	this._maxSpeed = 1;
};

VENUS.GoAndReturnAnimation.GO = 0;
VENUS.GoAndReturnAnimation.RETURN = 1;

VENUS.GoAndReturnAnimation.prototype = Object.create(VENUS.Animation.prototype);

VENUS.GoAndReturnAnimation.prototype.setDirection = function(direction) {
	this._direction = direction;
};

VENUS.GoAndReturnAnimation.prototype.setDuration = function(duration) {
	this._duration = duration;
};

VENUS.GoAndReturnAnimation.prototype.setSpeed = function(speed) {
	this._speed = speed;
};

VENUS.GoAndReturnAnimation.prototype.setMaxSpeed = function(maxSpeed) {
	this._maxSpeed = maxSpeed;
};
VENUS.GoAndReturnAnimation.prototype.setAcceleration = function(acceleration) {
	this._acceleration = acceleration;
};

VENUS.GoAndReturnAnimation.prototype.animate = function() {
	var role = this._role;

	if (this._startTime === - 1) {
		this._startTime = SharedUtil.getCurrentTime();
	}

	if (this._lastTime === - 1) {
		this._lastTime = SharedUtil.getCurrentTime();
	}

	// Do StraightFowardAnimation
	var now = SharedUtil.getCurrentTime();

	var elapse = now - this._startTime;

	if (this._duration > 0 && elapse > this._duration) {
		return;
	}

	var delta = now - this._lastTime;

	this._delayElapse += delta;

	role.translate(this._speed * delta, this._direction.clone());

	// update speed
	if (this._speed < this._maxSpeed) {
		this._speed += this._acceleration;
	}

	if (this._delayElapse > this._autoChangeDirectionDelay) {
		if (this._State === VENUS.GoAndReturnAnimation.GO) {
			this._direction.negate();
			this._State = VENUS.GoAndReturnAnimation.RETURN;
		}
		else if (this._State === VENUS.GoAndReturnAnimation.RETURN) {
			var x = VENUS.Math.random( - 1, 1);
			var y = VENUS.Math.random( - 1, 1);
			var z = VENUS.Math.random( - 1, 1);

			this._direction = new VENUS.Vector3(x, y, z);
			this._State = VENUS.GoAndReturnAnimation.GO;
		}

		this._delayElapse = 0;

	}

	this._lastTime = now;
};

