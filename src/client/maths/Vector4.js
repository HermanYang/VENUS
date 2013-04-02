VENUS.Vector4 = function(x, y, z, w) {
	this._elements = vec4.fromValues(x, y, z, w);
};

VENUS.Vector4.prototype.setValue = function(x, y, z, w) {
	vec4.set(this._elements, x, y, z, w);
	return this;
};

VENUS.Vector4.prototype.getElements = function(){
	return this._elements;
};

VENUS.Vector4.prototype.getX = function(){
	return this._elements[0];
};

VENUS.Vector4.prototype.getY = function(){
	return this._elements[1];
};

VENUS.Vector4.prototype.getZ = function(){
	return this._elements[2];
};

VENUS.Vector4.prototype.getW = function(){
	return this._elements[3];
};

VENUS.Vector4.prototype.add = function(vector4) {
	vec4.add(this._elements, this._elements, vector4.elements);
	return this;
};

VENUS.Vector4.prototype.substract = function(vector4) {
	vec4.substract(this._elements, this._elements, vector4.elements);
	return this;
};

VENUS.Vector4.prototype.scale = function(num) {
	vec4.scale(this._elements, this._elements, num);
	return this;
};

VENUS.Vector4.prototype.distance = function(vector4) {
	vec4.distance(this._elements, vector4.elements);
	return this;
};

VENUS.Vector4.prototype.length = function() {
	return vec4.length(this._elements);
};

VENUS.Vector4.prototype.negate = function() {
	return vec4.negate(this._elements, this._elements);
};

VENUS.Vector4.prototype.normalize = function() {
	vec4.normalize(this._elements, this._elements);
	return this;
};

VENUS.Vector4.prototype.dot = function(vector4) {
	vec4.dot(this._elements, vector4.elements);
	return this;
};

VENUS.Vector4.prototype.toString = function() {
	return vec4.str(this._elements);
};

