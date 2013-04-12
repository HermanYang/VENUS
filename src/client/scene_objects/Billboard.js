VENUS.Billboard = function(width, height) {
	VENUS.RenderableObject.call(this);

	this._material = new VENUS.Material();

	this._width = width;
	this._height = height;

	this._offsetDirections = this._createOffsetDirections();
	this._textureCoords = [new VENUS.Vector2(0, 1), new VENUS.Vector2(0, 0), new VENUS.Vector2(1, 1), new VENUS.Vector2(1, 0), new VENUS.Vector2(0, 0), new VENUS.Vector2(1, 1)];

	this._render = new VENUS.WebGLBillboardRenderer(this);
	this._offsetDirectionsNeedUpdated = false;
}

VENUS.Billboard.prototype = Object.create(VENUS.RenderableObject.prototype);

VENUS.Billboard.prototype.render = function(projectionMatrix, viewMatrix, position) {
	if (this._offsetDirectionsNeedUpdated) {
		this._offsetDirections = this._createOffsetDirections();
	}
	this._render.render(projectionMatrix, viewMatrix, position);
};

VENUS.Billboard.prototype._createOffsetDirections = function() {
	var x = this._width;
	var y = this._height;
	var offsetDirections = [new VENUS.Vector2( - x, y), new VENUS.Vector2( - x, - y), new VENUS.Vector2(x, y), new VENUS.Vector2(x, - y), new VENUS.Vector2( - x, - y), new VENUS.Vector2(x, y)];
	for (var i = 0; i < offsetDirections.length; ++i) {
		offsetDirections[i].normalize();
	}

	return offsetDirections;
};

VENUS.Billboard.prototype.getOffsetDirections = function() {
	return this._offsetDirections;
};

VENUS.Billboard.prototype.getTexturCoords = function() {
	return this._textureCoords;
};

VENUS.Billboard.prototype.getMaterial = function() {
	return this._material;
};

VENUS.Billboard.prototype.setWidth = function(width) {
	this._width = width;
	this._offsetDirectionsNeedUpdated = true;
};

VENUS.Billboard.prototype.setHeight = function(height) {
	this._height = height;
	this._offsetDirectionsNeedUpdated = true;
};

VENUS.Billboard.prototype.getHeight = function() {
	return this._height;
};

VENUS.Billboard.prototype.getWidth = function() {
	return this._width;
};

VENUS.Billboard.prototype.isTransparent = function(){
 return this._material.isTransparent();
}

