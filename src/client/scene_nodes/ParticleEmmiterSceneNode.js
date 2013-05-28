VENUS.ParticleEmmiterSceneNode = function(particleEmmiter) {
	if (particleEmmiter !== undefined) {
		SharedUtil.assert(particleEmmiter instanceof VENUS.ParticleEmmiter, "ParticleEmmiterSceneNode can just attach with ParticleEmmiter");
	}
	VENUS.MovableSceneNode.call(this, particleEmmiter);
};

VENUS.ParticleEmmiterSceneNode.prototype = Object.create(VENUS.MovableSceneNode.prototype);

VENUS.ParticleEmmiterSceneNode.prototype.setDirection = function(direction) {
	this._sceneObject.setDirection(direction);
};

VENUS.ParticleEmmiterSceneNode.prototype.render = function(projectionMatrix, cameraPosition, viewMatrix) {
	var position = this.getPosition();

	this._sceneObject.render(projectionMatrix, viewMatrix, position);
};

VENUS.ParticleEmmiterSceneNode.prototype.setRange = function(range) {
	this._sceneObject.setRange(range);
};

VENUS.ParticleEmmiterSceneNode.prototype.setParticleAmount = function(amount) {
	SharedUtil.assert(amount > 0, "particle amount should be a number and more than one");
	this._particles = [];
	this._particleAmount = amount;
};

VENUS.ParticleEmmiterSceneNode.prototype.setParticleMode = function(mode) {
	this._sceneObject.setParticleMode(mode);
};

VENUS.ParticleEmmiterSceneNode.prototype.setParticleSize = function(minSize, maxSize) {
	this._sceneObject.setParticleSize(minSize, maxSize);
};

VENUS.ParticleEmmiterSceneNode.prototype.setParticleSpeed = function(minSpeed, maxSpeed) {
	this._sceneObject.setParticleSpeed(minSpeed, maxSpeed);
};

VENUS.ParticleEmmiterSceneNode.prototype.setParticleLife = function(minLife, maxLife) {
	this._sceneObject.setParticleLife(minLife, maxLife);
};

VENUS.ParticleEmmiterSceneNode.prototype.setRandomColor = function(enable) {
	this._sceneObject.setRandomColor(enable);
};

VENUS.ParticleEmmiterSceneNode.prototype.setParticleAcceleration = function(minAcceleration, maxAcceleration) {
	this._sceneObject.setParticleAcceleration(minAcceleration, maxAcceleration);
};
