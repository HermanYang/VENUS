VENUS.Particle = function() {
	this._size = 1;
	VENUS.Billboard.call(this, this._size, this._size);

	this._direction = new VENUS.Vector3(0, 0, - 1);

	this._speed = 1;
	this._acceleration = 0;

	//the unit is second
	this._lifeTime = 1;
	this._bornTime = - 1;
};

VENUS.Particle.prototype = Object.create(VENUS.Billboard.prototype);

VENUS.Particle.prototype.render = function(projectionMatrix, viewMatrix, position) {
	if (this._offsetDirectionsNeedUpdated) {
		this._offsetDirections = this._createOffsetDirections();
	}

	// compute center position
	var direction = this._direction.clone();
	var elapse = this.getElapse();
	var speed = this._speed + this._acceleration * elapse;
	var shrinkage = 1.0 - (elapse / this._lifeTime);
	var material = this._material;

	var alpha = shrinkage;
	var size = this._size;

	this.setSize(size);
	material.setAlpha(alpha);
	position.add(direction.scale(speed * elapse));

	// render
	this._render.render(projectionMatrix, viewMatrix, position);
};

VENUS.Particle.prototype.setSpeed = function(speed) {
	this._speed = speed;
};

VENUS.Particle.prototype.setDirection = function(direction) {
	direction.normalize();
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

VENUS.Particle.prototype.setTexture = function(texture) {
	var material = this._material;
	material.set2DTexture(texture);
	material.setTransparent(true);
};

VENUS.Particle.prototype.setColor = function(color) {
	var material = this._material;
	material.setColor(color);
};

VENUS.Particle.prototype.setSize = function(size) {
	this._size = size;
	this.setWidth(size);
	this.setHeight(size);
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
	var elapseSeconds = this.getElapse();
	if (elapseSeconds > this._lifeTime) {
		return false;
	}

	return true;
};

//The unit is second
VENUS.Particle.prototype.getElapse = function() {
	var date = new Date();
	var elapse = date.getTime() - this._bornTime;
	var elapseSeconds = elapse / 1000;
	return elapseSeconds;
};

