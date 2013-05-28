VENUS.CentripetalAnimation = function() {
	VENUS.Animation.call(this);

	this._direction = new VENUS.Vector3(0, 0, 1);
	this._speed = 0;

	this._startTime = - 1;
	this._lastTime = - 1;
	this._duration = - 1;

	this._acceleration = 0;

	this._maxSpeed = 1;
};

VENUS.CentripetalAnimation.prototype = Object.create(VENUS.Animation.prototype);


VENUS.CentripetalAnimation.prototype.setDuration = function(duration) {
	this._duration = duration;
};

VENUS.CentripetalAnimation.prototype.setSpeed = function(speed) {
	this._speed = speed;
};

VENUS.CentripetalAnimation.prototype.setMaxSpeed = function(maxSpeed) {
	this._maxSpeed = maxSpeed;
};

VENUS.CentripetalAnimation.prototype.setAcceleration = function(acceleration) {
	this._acceleration = acceleration;
};

VENUS.CentripetalAnimation.prototype.animate = function() {
	var role = this._role;

	if (this._startTime === - 1) {
		this._startTime = SharedUtil.getCurrentTime();
	}

	if (this._lastTime === - 1) {
		this._lastTime = SharedUtil.getCurrentTime();
	}

	var now = SharedUtil.getCurrentTime();

	var elapse = now - this._startTime;

	if (this._duration > 0 && elapse > this._duration) {
		return;
	}

	var delta = now - this._lastTime;

	// do animation
	
	var direction = role.getPosition();
	var centreDirection = direction.subtract(new VENUS.Vector3(0, 0, 0)).clone();
	var upVector = new VENUS.Vector3(0, 1, 0);
	var rotationMatrix = role.getRotationTransformMatrix();
	direction.cross(upVector);
	direction.normalize();
	var currentDirection = role.getCurentDirection();
	currentDirection.normalize();
	var cosDegree = currentDirection.dot(direction);

	// clamp cosDegree, it must not bigger than 1
	if(cosDegree > 1){
		cosDegree = 1;
	}

	var degree = VENUS.Math.arccos(cosDegree);
	var axis = currentDirection.clone().cross(direction);
	
	role.rotate(degree, axis);
	role.translate( this._speed * delta, new VENUS.Vector3(0, 0, -1));

	// change speed 
	if (this._speed < this._maxSpeed) {
		this._speed += this._acceleration;
	}

	this._lastTime = now;
};
