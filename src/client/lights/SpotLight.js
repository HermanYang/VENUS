VENUS.SpotLight = function() {
	VENUS.Light.call(this);
	this._range = 0;
	this._direction = new VENUS.Vector3(0, 0, 0);
};

VENUS.SpotLight.prototype = Object.create(VENUS.Light.prototype);

VENUS.SpotLight.prototype.setRange = function(degree) {
	this._range = degree;
};

VENUS.SpotLight.prototype.setDirection = function(directionVector3) {
	this._direction = directionVector3;
};

VENUS.SpotLight.prototype.getDirection = function() {
	return this._direction;
};

VENUS.SpotLight.prototype.getRange = function() {
	return this._range;
};

VENUS.SpotLight.prototype.getCosCutoff = function() {
	return  VENUS.Math.cos(this._range);
};

