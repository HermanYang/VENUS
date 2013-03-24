VENUS.Entity = function() {
	VENUS.RenderableObject.call(this);

	this._mesh = new VENUS.Mesh();
	this._material = new VENUS.Material();

	this._gl = VENUS.Engine.getInstance().getWebGLConfiguration().getContext();

	this._renderer = new VENUS.WebGLEntityRenderer(this);
};

// inherit from RenderableObject
VENUS.Entity.prototype = Object.create(VENUS.RenderableObject.prototype);

VENUS.Entity.prototype.getMesh = function() {
	return this._mesh;
};

VENUS.Entity.prototype.setMesh = function(mesh) {
	this._mesh = mesh;
};

VENUS.Entity.prototype.getMaterial = function() {
	return this._material;
};

VENUS.Entity.prototype._updateTextures = function() {
	var gl = this._gl;

	for (var i = 0; i < this._material.textureBufferNeedUpdates.length; i++) {
		if (this._material.textureBufferNeedUpdates[i]) {
			var textureBuffer = this._material.textureBuffers[i];
			if (textureBuffer != null || textureBuffer !== undefined) {
				// delete outdated texture
				gl.deleteTexture(textureBuffer);
			}

			this._material.textureBuffers[i] = gl.createTexture();
			textureBuffer = this._material.textureBuffers[i];

			gl.bindTexture(gl.TEXTURE_2D, textureBuffer);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._material._textures[i].image);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}
	}
}

VENUS.Entity.prototype.render = function(projectionMatrix, modelViewMatrix) {
	this._renderer.render(projectionMatrix, modelViewMatrix);
}
