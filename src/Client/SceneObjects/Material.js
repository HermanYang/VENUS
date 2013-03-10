VENUS.Material = function(colors, ambientLightCoef, diffuseLightCoef, specularLightCoef) {
	this._colors = colors === undefined ? null: colors;

	this.ambientLightCoef = ambientLightCoef === undefined ? new VENUS.Vector3(1, 1, 1) : ambientLightCoef;
	this.diffuseLightCoef = diffuseLightCoef === undefined ? new VENUS.Vector3(1, 1, 1) : diffuseLightCoef;
	this.specularLightCoef = specularLightCoef === undefined ? new VENUS.Vector3(1, 1, 1) : specularLightCoef;

	this.textures = [];

	this.colorBufferNeedUpdate = this._colors === null ? false: true;
	this.textureBufferNeedUpdates = [];

	this.colorBuffer = null;
	this.textureBuffers = [];
};

VENUS.Material.prototype.addTexture = function(texture) {
	this.textures.push(texture);
	var shouldUpdate = texture == null ? false: true;
	this.textureBufferNeedUpdates.push(shouldUpdate);
}

VENUS.Material.prototype.setColors = function(colors) {
	this._colors = colors;
	this.colorBufferNeedUpdate = this._colors === null ? false: true;
}

VENUS.Material.prototype.getColors = function() {
	return this._colors;
}

