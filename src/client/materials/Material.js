VENUS.Material = function() {
	this._colors = null;

	this._ambientLightCoef = new VENUS.Vector3(1.0, 1.0, 1.0);
	this._diffuseLightCoef = new VENUS.Vector3(1.0, 1.0, 1.0);
	this._specularLightCoef = new VENUS.Vector3(1.0, 1.0, 1.0);

	this._shininess = 36;

	this._textures = [];

	this.colorsChanged = false;
	this.textureBufferNeedUpdates = [];

	this.textureBuffers = [];
};

VENUS.Material.prototype.addTexture = function(texture) {
	SharedUtil.assert(texture !== undefined && texture != null, "addTexture need parameters");
	this._textures.push(texture);
	this.textureBufferNeedUpdates.push(true);
};

VENUS.Material.prototype.setColors = function(colors) {
	SharedUtil.assert(colors !== undefined && colors != null, "setColors need parameters");
	this._colors = colors;
	this.colorsChanged = true;
};

VENUS.Material.prototype.getColors = function() {
	return this._colors;
};

VENUS.Material.prototype.getTextures = function() {
	return this._textures;
};

VENUS.Material.prototype.setAmbientLigthCoef = function(coef) {
	SharedUtil.assert(coef !== undefined && coef != null, "setAmbientLigthCoef need parameters");
	this._ambientLightCoef = coef;
};

VENUS.Material.prototype.setDiffuseLightCoef = function(coef) {
	SharedUtil.assert(coef !== undefined && coef != null, "setDiffuseLightCoef need parameters");
	this._diffuseLightCoef = coef;
};

VENUS.Material.prototype.setSpecularLightCoef = function(coef) {
	SharedUtil.assert(coef !== undefined && coef != null, "setSpecularLightCoef need parameters");
	this._specularLightCoef = coef;
};

VENUS.Material.prototype.setShininess = function(shiniess) {
	this._shininess = shiniess;
};

VENUS.Material.prototype.getShininess = function() {
	return this._shininess;
};

