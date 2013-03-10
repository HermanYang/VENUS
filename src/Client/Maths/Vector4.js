VENUS.Vector4 = function(x, y, z, w) {
	this.elements = vec4.fromValues(x, y, z, w);
};

VENUS.Vector4.prototype.setelements = function(x, y, z, w) {
	vec4.set(this.elements, x, y, z, w);
	return this;
};

VENUS.Vector4.prototype.add = function(vector4) {
	vec4.add(this.elements, this.elements, vector4.elements);
	return this;
};

VENUS.Vector4.prototype.substract = function(vector4) {
	vec4.substract(this.elements, this.elements, vector4.elements);
	return this;
};

VENUS.Vector4.prototype.scale = function(num) {
	vec4.scale(this.elements, this.elements, num);
	return this;
};

VENUS.Vector4.prototype.distance = function(vector4) {
	vec4.distance(this.elements, vector4.elements);
	return this;
};

VENUS.Vector4.prototype.length = function() {
	return vec4.length(this.elements);
};

VENUS.Vector4.prototype.negate = function() {
	return vec4.negate(this.elements, this.elements);
};

VENUS.Vector4.prototype.normalize = function() {
	vec4.normalize(this.elements, this.elements);
	return this;
};

VENUS.Vector4.prototype.dot = function(vector4) {
	vec4.dot(this.elements, vector4.elements);
	return this;
};

VENUS.Vector4.prototype.toString = function() {
	return vec4.str(this.elements);
};

