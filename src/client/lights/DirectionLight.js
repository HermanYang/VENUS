VENUS.DirectionLight = function() {
	VENUS.Light.call(this);

	this._direction = null;
};

VENUS.DirectionLight.prototype = Object.create(VENUS.Light.prototype);

VENUS.DirectionLight.prototype.getDirection = function() {
	return this._direction;
};

VENUS.DirectionLight.prototype.setDirection = function(directionVector3) {
	this._direction = directionVector3;
};
