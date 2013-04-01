VENUS.Light = function() {
	VENUS.SceneObject.call(this);

	this._ambientColor = new VENUS.Vector3(0.0, 0.0, 0.0);
	this._diffuseColor = new VENUS.Vector3(0.0, 0.0, 0.0);
	this._specularColor = new VENUS.Vector3(0.0, 0.0, 0.0);
}

VENUS.Light.prototype = Object.create(VENUS.SceneObject.prototype);

VENUS.Light.prototype.setAmbientLightColor = function(colorVector3) {
	this._ambientColor = colorVector3;
};

VENUS.Light.prototype.setDiffuseLightColor = function(colorVector3) {
	this._diffuseColor = colorVector3;
};

VENUS.Light.prototype.setSpecularLightColor = function(colorVector3) {
	this._specularColor = colorVector3;
};

VENUS.Light.prototype.getAmbientLightColor = function() {
	return this._ambientColor;
};

VENUS.Light.prototype.getDiffuseLightColor = function() {
	return this._diffuseColor;
};

VENUS.Light.prototype.getSpecularLightColor = function() {
	return this._specularColor;
};

