VENUS.Vector2 = function(x, y) {
	this._elements = vec2.fromValues(x, y);
}

VENUS.Vector2.prototype.copy = function(vector2) {
	this._elements = vec2.copy(vector2.elements);
	return this;
}

VENUS.Vector2.prototype.getElements = function() {
	return this._elements;
};

VENUS.Vector2.prototype.setValue = function(x, y) {
	vec2.set(this._elements, x, y);
}

VENUS.Vector2.prototype.getX = function() {
	return this._elements[0];
};

VENUS.Vector2.prototype.getY = function() {
	return this._elements[1];
};

VENUS.Vector2.prototype.add = function(vector2) {
	vec2.add(this._elements, this._elements, vector2._elements);
	return this;
}

VENUS.Vector2.prototype.subtract = function(vector2) {
	vec2.subtract(this._elements, this._elements, vector2._elements);
}

VENUS.Vector2.prototype.scale = function(num) {
	vec2.scale(this._elements, this._elements, num);
	return this;
}

VENUS.Vector2.prototype.distance = function(vector2) {
	return vec2.distance(this._elements, vector2._elements);
}

VENUS.Vector2.prototype.length = function() {
	return vec2.length(this._elements);
}

VENUS.Vector2.prototype.negate = function() {
	vec2.negate(this._elements, this._elements);
	return this;
}

VENUS.Vector2.prototype.normalize = function() {
	vec2.normalize(this._elements, this._elements);
	return this;
}

VENUS.Vector2.prototype.dot = function(vector2) {
	vec2.dot(this._elements, vector2._elements);
	return this;
}

VENUS.Vector2.prototype.cross = function(vector2) {
	vec2.cross(this._elements, vector2._elements);
	return this;
}

VENUS.Vector2.prototype.toString = function() {
	return vec2.str(this._elements);
}

