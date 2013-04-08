VENUS.ParticleEmmiter = function() {
	VENUS.RenderableObject.call(this);

	this._particles = [];
	this._direction = new VENUS.Vector3(1, 0, 0);
	this._range = 0;
	this._particleAmount = 100;

	this._needUpadete = true;

	this._renderer = new VENUS.WebGLParticleRenderer(this);

	this._texture = null;
};

VENUS.ParticleEmmiter.prototype = Object.create(VENUS.RenderableObject.prototype);

VENUS.ParticleEmmiter.prototype.setTexture = function(texture) {
	this._texture = texture;
};

VENUS.ParticleEmmiter.prototype.getTexture = function(){
	return this._texture;
};

VENUS.ParticleEmmiter.prototype._createParticles = function() {
	var date = new Date();
	for (var i = 0; i < this._particleAmount; ++i) {
		var particle = new VENUS.Particle();
		particle.setBornTime(date.getTime());
		particle.setSpeed(VENUS.Math.random(0.001, 0.1));
		particle.setLifeTime(VENUS.Math.random(10, 1000));

		this._particles.push(particle);
	}
};

VENUS.ParticleEmmiter.prototype.render = function() {
	if (this._particles.length <= 0) {
		this._createParticles();
	}

	this._renderer.render();
};

VENUS.ParticleEmmiter.prototype._updateParticles = function() {
	var date = new Date();
	for (var i = 0; i < this._particles.length; ++i) {
		var particle = this._particles[i];
		if (!particle.isAlive()) {
			particle.setBornTime(date.getTime());
			particle.setSpeed(VENUS.Math.random(0.001, 0.1));
			particle.setLifeTime(VENUS.Math.random(10, 1000));

		}
	}
};

VENUS.ParticleEmmiter.prototype.getParticleDirections = function() {
	var directions = [];
	for (var i = 0; i < this._particles.length; ++i) {
		var particle = this._particles[i];
		directions.push(particle.getDirection());
	}

	this._updateParticles();

	return directions;
};

VENUS.ParticleEmmiter.prototype.getParticleSpeeds = function() {
	var speeds = [];
	for (var i = 0; i < this._particles.length; ++i) {
		var particle = this._particles[i];
		speeds.push(particle.getSpeed());
	}
	return speeds;

};

VENUS.ParticleEmmiter.prototype.getParticleLifeTimes = function() {
	var lifeTimes = [];
	for (var i = 0; i < this._particles.length; ++i) {
		var particle = this._particles[i];
		lifeTimes.push(particle.getLiftTime());
	}
	return lifeTimes;
};

VENUS.ParticleEmmiter.prototype.getParticleElapses = function() {
	var elapses = [];
	for (var i = 0; i < this._particles.length; ++i) {
		var particle = this._particles[i];
		elapses.push(particle.getElapse());
	}
	return elapses;
};

