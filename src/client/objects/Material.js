VENUS.Material = function() {
	this._colors = null;

	this._ambientLightCoef = null;
	this._diffuseLightCoef = null;
	this._specularLightCoef = null;

	this._textures = [];

	this.colorsChanged = false;
	this.textureBufferNeedUpdates = [];

	this.textureBuffers = [];
};

VENUS.Material.prototype.addTexture = function(texture) {
	VENUS.assert(texture !== undefined && texture != null, "addTexture need parameters");
	this._textures.push(texture);
	this.textureBufferNeedUpdates.push(true);
}

VENUS.Material.prototype.setColors = function(colors) {
	VENUS.assert(colors !== undefined && colors != null, "setColors need parameters");
	this._colors = colors;
	this.colorsChanged = true;
}

VENUS.Material.prototype.getColors = function() {
	return this._colors;
}

VENUS.Material.prototype.setAmbientLigthCoef = function(coef) {
	VENUS.assert(coef !== undefined && coef != null, "setAmbientLigthCoef need parameters");
	this._ambientLightCoef = coef;
}

VENUS.Material.prototype.setDiffuseLightCoef= function(coef) {
	VENUS.assert(coef !== undefined && coef != null, "setDiffuseLightCoef need parameters");
	this._diffuseLightCoef= coef;
}

VENUS.Material.prototype.setSpecularLightCoef = function(coef) {
	VENUS.assert(coef !== undefined && coef != null, "setSpecularLightCoef need parameters");
	this._specularLightCoef = coef;
}
