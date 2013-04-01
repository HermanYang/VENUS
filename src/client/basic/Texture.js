VENUS.Texture = function() {
	this._context = VENUS.Engine.getInstance().getWebGLConfiguration().getContext();
	this._textureBuffer = null;
	this._basicTextureUint = this._context.TEXTURE0;
}

VENUS.Texture.prototype.createTexture = function(image) {
	var gl = this._context;

	this.releaseTexture();

	this._textureBuffer = gl.createTexture();

	gl.bindTexture(gl.TEXTURE_2D, this._textureBuffer);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	gl.bindTexture(gl.TEXTURE_2D, null);
};

VENUS.Texture.prototype.bind = function() {
	var gl = this._context;
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, this._textureBuffer);

	return this;
};

VENUS.Texture.prototype.releaseTexture = function() {
	if (this._textureBuffer != null) {
		var gl = this._context;
		gl.deleteTexture(this._textureBuffer);
		this._textureBuffer = null;
	}

	return this;
};

