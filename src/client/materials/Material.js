VENUS.Material = function() {
	this._colors = null;

	this._ambientLightCoef = new VENUS.Vector3(1.0, 1.0, 1.0);
	this._diffuseLightCoef = new VENUS.Vector3(1.0, 1.0, 1.0);
	this._specularLightCoef = new VENUS.Vector3(1.0, 1.0, 1.0);

	this._shininess = 36;

	this.colorsChanged = false;

	this._2DTexture = null;
	this._cubeMapTexture = null;
};

VENUS.Material.prototype.set2DTexture = function(texture) {
	SharedUtil.assert(texture !== undefined, "set2DTexture need parameters");
	this._2DTexture = texture;
};

VENUS.Material.prototype.setCubeMapTexture = function(texture) {
	SharedUtil.assert(texture !== undefined, "addTexture need parameters");
	this._cubeMapTexture = texture;
};

VENUS.Material.prototype.setColors = function(colors) {
	SharedUtil.assert(colors !== undefined, "setColors need parameters");
	this._colors = colors;
	this.colorsChanged = true;
};

VENUS.Material.prototype.getColors = function() {
	return this._colors;
};

VENUS.Material.prototype.get2DTexture = function() {
	return this._2DTexture;
};

VENUS.Material.prototype.getCubeMapTexture = function(){
	return this._cubeMapTexture;
};

VENUS.Material.prototype.setAmbientLigthCoef = function(coef) {
	SharedUtil.assert(coef !== undefined,"setAmbientLigthCoef need parameters");
	this._ambientLightCoef = coef;
};

VENUS.Material.prototype.setDiffuseLightCoef = function(coef) {
	SharedUtil.assert(coef !== undefined, "setDiffuseLightCoef need parameters");
	this._diffuseLightCoef = coef;
};

VENUS.Material.prototype.setSpecularLightCoef = function(coef) {
	SharedUtil.assert(coef !== undefined, "setSpecularLightCoef need parameters");
	this._specularLightCoef = coef;
};

VENUS.Material.prototype.setShininess = function(shiniess) {
	this._shininess = shiniess;
};

VENUS.Material.prototype.getShininess = function() {
	return this._shininess;
};

