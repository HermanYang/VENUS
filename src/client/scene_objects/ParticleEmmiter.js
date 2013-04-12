VENUS.ParticleEmmiter = function() {
	VENUS.RenderableObject.call(this);

	this._direction = new VENUS.Vector3(1, 0, 0);
	this._particles = [];
	this._range = 0;
	this._particleAmount = 100;

	this._needUpadete = true;

	this._texture = null;
	this._color = new VENUS.Vector4(1.0, 0.0, 0.0, 5.0);
};

VENUS.ParticleEmmiter.prototype = Object.create(VENUS.RenderableObject.prototype);

VENUS.ParticleEmmiter.prototype.setTexture = function(texture) {
	this._texture = texture;
};

VENUS.ParticleEmmiter.prototype.getTexture = function() {
	return this._texture;
};

VENUS.ParticleEmmiter.prototype._createParticles = function() {
	for (var i = 0; i < this._particleAmount; ++i) {
		var particle = new VENUS.Particle();
		this._initParticle(particle);
		this._particles.push(particle);
	}
};

VENUS.ParticleEmmiter.prototype.render = function(projectionMatrix, viewMatrix, position) {
	if (this._particles.length === 0) {
		this._createParticles();
	}

	this._updateParticles();

	for (var i = 0; i < this._particles.length; ++i) {
		var particle = this._particles[i];
		particle.render(projectionMatrix, viewMatrix, position);
	}

};

VENUS.ParticleEmmiter.prototype._initParticle = function(particle) {
	var date = new Date();
	var texture = this._texture;
	var color = this._color;

	particle.setBornTime(date.getTime());
	particle.setSpeed(VENUS.Math.random(0.01, 0.1));
	particle.setLifeTime(4);
	particle.setTexture(texture)
	particle.setColor(color);
	particle.setSize(1.0);
};

VENUS.ParticleEmmiter.prototype._updateParticles = function() {
	for (var i = 0; i < this._particles.length; ++i) {
		var particle = this._particles[i];

		// if particle is dead
		if (!particle.isAlive()) {
			this._initParticle(particle);
		}
	}
};

VENUS.ParticleEmmiter.prototype.isTransparent = function(){
	return true;
};
