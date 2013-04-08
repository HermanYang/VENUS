VENUS.Texture = function() {
	this._context = VENUS.Engine.getInstance().getWebGLConfiguration().getContext();
	this._textureBuffer = null;
	this._type = null;
	this._index = - 1;
}

VENUS.Texture.prototype.createTexture = function(type, internalFormat, format, dataType, dataPositiveX, dataNegativeX, dataPositiveY, dataNegativeY, dataPositiveZ, dataNegativeZ) {
	var gl = this._context;
	var webglConst = VENUS.Engine.getWebGLConstants();
	var texture2DIndex = 0;
	var textureCubeMapIndex = 1;

	this.releaseTexture();

	this._type = type;
	this._textureBuffer = gl.createTexture();

	gl.bindTexture(type, this._textureBuffer);

	switch (type) {
	case webglConst.TEXTURE_2D:
		{
			gl.texImage2D(type, 0, internalFormat, format, dataType, dataPositiveX);
			this._index = texture2DIndex;
			break;
		}

	case webglConst.TEXTURE_CUBE_MAP:
		{
			gl.texImage2D(webglConst.TEXTURE_CUBE_MAP_POSITIVE_X, 0, internalFormat, format, dataType, dataPositiveX);
			gl.texImage2D(webglConst.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, internalFormat, format, dataType, dataNegativeX);
			gl.texImage2D(webglConst.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, internalFormat, format, dataType, dataPositiveY);
			gl.texImage2D(webglConst.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, internalFormat, format, dataType, dataNegativeY);
			gl.texImage2D(webglConst.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, internalFormat, format, dataType, dataPositiveZ);
			gl.texImage2D(webglConst.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, internalFormat, format, dataType, dataNegativeZ);

			this._index = textureCubeMapIndex;
			break;
		}
	}

	gl.bindTexture(type, null);
};

VENUS.Texture.prototype.getIndex = function() {
	return this._index;
};

VENUS.Texture.prototype.setIndex = function(index) {
	this._index = index;
};

VENUS.Texture.prototype.bind = function() {
	if (this._type !== null) {
		var gl = this._context;
		var textureIndex = gl.TEXTURE0 + this._index;
		gl.activeTexture(textureIndex);
		gl.bindTexture(this._type, this._textureBuffer);
	}
};

VENUS.Texture.prototype.getType = function() {
	return this._type;
};

VENUS.Texture.prototype.setMinFilter = function(minFilterEnum) {
	SharedUtil.assert(minFilterEnum !== undefined, "setMinFilter need parameters");
	var gl = this._context;
	gl.bindTexture(this._type, this._textureBuffer);
	gl.texParameteri(this._type, gl.TEXTURE_MIN_FILTER, minFilterEnum);
	gl.bindTexture(this._type, null);
};

VENUS.Texture.prototype.setMagFilter = function(magFilterEnum) {
	SharedUtil.assert(magFilterEnum !== undefined, "setMagFilter need parameters");
	var gl = this._context;
	gl.bindTexture(this._type, this._textureBuffer);
	gl.texParameteri(this._type, gl.TEXTURE_MAG_FILTER, magFilterEnum);
	gl.bindTexture(this._type, null);
};

VENUS.Texture.prototype.setWraps = function(wrapInS, wrapInT) {
	SharedUtil.assert(wrapInS !== undefined && wrapInT !== undefined, "setWraps need parameters");

	var gl = this._context;
	gl.bindTexture(this._type, this._textureBuffer);
	gl.texParameteri(this._type, gl.TEXTURE_WRAP_S, wrapInS);
	gl.texParameteri(this._type, gl.TEXTURE_WRAP_T, wrapInT);
	gl.bindTexture(this._type, null);
};

VENUS.Texture.prototype.releaseTexture = function() {
	if (this._textureBuffer !== null) {
		var gl = this._context;
		gl.deleteTexture(this._textureBuffer);
		this._textureBuffer = null;
		this._index = - 1;
	}
};

