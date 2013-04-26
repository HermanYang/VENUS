VENUS.ParticleEmmiter = function() {
	VENUS.RenderableObject.call(this);

	this._direction = new VENUS.Vector3(0, 0, 1);
	this._particles = [];
	this._range = 15;

	this._maxParticleSize = 2.0;
	this._minParticleSize = 0.1;

	this._maxParticleLife = 3.0;
	this._minParticleLife = 1.0;

	this._maxParticleSpeed = 5.0;
	this._minParticleSpeed = 1.0;

	this._minParticleAcceleration = 0.0;
	this._maxParticleAcceleration = 1.0;

	this._particleAmount = 500;
	this._position = new VENUS.Vector3(0, 0, 0);
	this._enableRandomColor = true;
	this._mode = VENUS.ParticleEmmiter.Mode.DIRECTION;
	this._texture = null;
	this._color = new VENUS.Vector4(1.0, 1.0, 1.0, 1.0);

	this._affectors = [];
};

VENUS.ParticleEmmiter.Mode = {
	DIRECTION:0,
	EXPLOSION:1
};

VENUS.ParticleEmmiter.prototype = Object.create(VENUS.RenderableObject.prototype);

VENUS.ParticleEmmiter.prototype.setTexture = function(texture) {
	this._texture = texture;
};

VENUS.ParticleEmmiter.prototype.getTexture = function() {
	return this._texture;
};

VENUS.ParticleEmmiter.prototype._createParticles = function() {
	var date = new Date();
	for (var i = 0; i < this._particleAmount; ++i) {
		var particle = new VENUS.Particle();
		this._initParticle(particle, date.getTime());
		this._particles.push(particle);
	}
};

VENUS.ParticleEmmiter.prototype.render = function(projectionMatrix, viewMatrix, position) {
	this._position = position;

	if (this._particles.length === 0) {
		this._createParticles();
	}

	this._updateParticles();

	for (var i = 0; i < this._particles.length; ++i) {
		var particle = this._particles[i];
		particle.render(projectionMatrix, viewMatrix, position.clone());
	}

};

VENUS.ParticleEmmiter.prototype._initParticle = function(particle, time) {
	var texture = this._texture;
	var color = this._color;

	particle.setBornTime(time);

	particle.setDirection(this._getRandomDirection());
	particle.setSpeed(VENUS.Math.random(this._minParticleSpeed, this._maxParticleSpeed));
	particle.setLifeTime(VENUS.Math.random(this._minParticleLife, this._maxParticleLife));
	particle.setTexture(texture)
	particle.setColor(this._getParticleColor());
	particle.setSize(VENUS.Math.random(this._minParticleSize, this._maxParticleSize));
	particle.setAcceleration(VENUS.Math.random(this._minParticleAcceleration, this._maxParticleAcceleration));
};

VENUS.ParticleEmmiter.prototype._getParticleColor = function() {
	if(this._enableRandomColor){
		var r = VENUS.Math.random(0, 1);
		var g = VENUS.Math.random(0, 1);
		var b = VENUS.Math.random(0, 1);
		return new VENUS.Vector4(r, g, b, 1.0);
	}
	else{
		return color;
	}
};

VENUS.ParticleEmmiter.prototype._getRandomDirection = function() {
	switch (this._mode) {
	case VENUS.ParticleEmmiter.Mode.DIRECTION:
		{
			SharedUtil.assert(this._range < 90, "range must not bigger than 90 degree");

			var range = this._range;
			var theta = VENUS.Math.random(0, range);

			var A = this._direction.getX();
			var B = this._direction.getY();
			var C = this._direction.getZ();
			var D = - (A * this._position.getX() + B * this._position.getY() + C * this._position.getZ());

			var length = VENUS.Math.tan(theta);
			var x = 0;
			var y = 0;
			var z = 0;

			if (A !== 0) {
				y = VENUS.Math.random( - 1, 1);
				z = VENUS.Math.random( - 1, 1);
				x = - (B * y + C * z) / A;

			} else if (B !== 0) {
				x = VENUS.Math.random( - 1, 1);
				z = VENUS.Math.random( - 1, 1);
				y = - (A * x + C * z) / A;

			} else if (C !== 0) {
				x = VENUS.Math.random( - 1, 1);
				y = VENUS.Math.random( - 1, 1);
				z = - (A * x + B * y) / C;
			}

			var direction = new VENUS.Vector3(x, y, z);
			direction.normalize();
			direction.scale(length);

			direction.add(this._direction);
			direction.normalize();
			return direction;
		}

	case VENUS.ParticleEmmiter.Mode.EXPLOSION:
		{
			var x = VENUS.Math.random( - 1, 1);
			var y = VENUS.Math.random( - 1, 1);
			var z = VENUS.Math.random( - 1, 1);
			var direction = new VENUS.Vector3(x, y, z);
			direction.normalize();
			return direction;
		}
	}
};

VENUS.ParticleEmmiter.prototype._updateParticles = function() {
	var date = new Date();
	for (var i = 0; i < this._particles.length; ++i) {
		var particle = this._particles[i];

		// if particle is dead
		if (!particle.isAlive()) {
			this._initParticle(particle, date.getTime());
		}
	}
};

VENUS.ParticleEmmiter.prototype.setDirection = function(direction) {
	this._direction = direction;
	this._direction.normalize();
};

VENUS.ParticleEmmiter.prototype.setRange = function(range) {
	this._range = range;
};

VENUS.ParticleEmmiter.prototype.isTransparent = function() {
	return true;
};

VENUS.ParticleEmmiter.prototype.setParticleAmount = function(amount) {
	SharedUtil.assert(amount > 0, "particle amount should be a number and more than one");
	this._particles = [];
	this._particleAmount = amount;
};

VENUS.ParticleEmmiter.prototype.setParticleMode = function(mode) {
	SharedUtil.assert(VENUS.ParticleEmmiter.Mode.hasOwnProperty(mode), "illegal mode");
	this._mode = mode;
};

VENUS.ParticleEmmiter.prototype.setParticleSize = function(minSize, maxSize){
	this._minParticleSize = minSize;
	this._maxParticleSize = maxSize;
};

VENUS.ParticleEmmiter.prototype.setParticleSpeed = function(minSpeed, maxSpeed){
	this._minParticleSpeed = minSpeed;
	this._maxParticleSpeed = maxSpeed;
};

VENUS.ParticleEmmiter.prototype.setParticleLife = function(minLife, maxLife){
	this._minParticleLife = minLife;
	this._maxParticleLife = maxLife;
};

VENUS.ParticleEmmiter.prototype.setRandomColor = function(enable){
	this._enableRandomColor = enable;
};

VENUS.ParticleEmmiter.prototype.setParticleAcceleration = function(minAcceleration, maxAcceleration){
	this._minParticleAcceleration = minAcceleration;
	this._maxParticleAcceleration = maxAcceleration;
};
