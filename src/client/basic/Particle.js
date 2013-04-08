VENUS.Particle = function() {
	this._position = new VENUS.Vector3(0, 0, 0);
	this._speed = 0.001;
	this._direction = new VENUS.Vector3(0, 1, 1);
	this._acceleration = 1;
	this._lifeTime = 1000;
	this._bornTime = - 1;
};

VENUS.Particle.prototype.setSpeed = function(speed) {
	this._speed = speed;
};

VENUS.Particle.prototype.setDirection = function(direction) {
	this._direction = direction;
};

VENUS.Particle.prototype.setAcceleration = function(acceleration) {
	this._acceleration = acceleration;
};

VENUS.Particle.prototype.setLifeTime = function(lifeTime) {
	this._lifeTime = lifeTime;
};

VENUS.Particle.prototype.setBornTime = function(bornTime) {
	this._bornTime = bornTime;
};

VENUS.Particle.prototype.getDirection = function() {
	return this._direction;
};

VENUS.Particle.prototype.getSpeed = function() {
	return this._speed;
};

VENUS.Particle.prototype.getLiftTime = function() {
	return this._lifeTime;
};

VENUS.Particle.prototype.getBornTime = function() {
	return this._bornTime;
};

VENUS.Particle.prototype.isAlive = function() {
	var elapse = this.getElapse();
	if (elapse > this._lifeTime) {
		return false;
	}

	return true;
};

VENUS.Particle.prototype.getElapse = function() {
	var date = new Date();
	var elapse = date.getTime() - this._bornTime;
	return elapse;
};

