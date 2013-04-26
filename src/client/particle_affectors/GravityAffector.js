VENUS.GravityAffector = function(){
	VENUS.Affector.call(this);
	this._gravity = 0.05;
	this._direction = new VENUS.Vector3(0, -1, 0);
};

VENUS.GravityAffector.prototype = Object.create(VENUS.Affector);

VENUS.GravityAffector.prototype.affect = function(particle){
	var originalVelocity = particle.getDirection();
	var originalSpeed = particle.getSpeed();
	var affectorVelocity = this._direction.clone();

	affectorVelocity.scale(this._gravity);
	originalVelocity.scale(originalSpeed);

	affectorVelocity.add(originalVelocity);

	particle.setSpeed(affectorVelocity.length());
	particle.setDirection(affectorVelocity.normalize());
};

VENUS.GravityAffector.prototype.setGravity = function(gravity, direction){
	this._gravity = gravity;
	this._direction = direction;
	this._direction.normalize();
};
