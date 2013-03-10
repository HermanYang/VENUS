VENUS.Vector2 = function(x, y) {
	this.elements = vec2.fromValues(x, y);
}

VENUS.Vector2.prototype.copy = function(vector2) {
	this.elements = vec2.copy(vector2.elements);
	return this;
}

VENUS.Vector2.prototype.setValue = function(x, y) {
	vec2.set(this.elements, x, y);
	return this;
}

VENUS.Vector2.prototype.add = function(vector2) {
	vec2.add(this.elements, this.elements, vector2.elements);
	return this;
}

VENUS.Vector2.prototype.subtract = function(vector2) {
	vec2.subtract(this.elements, this.elements, vector2.elements);
	return this;
}

VENUS.Vector2.prototype.scale = function(num) {
	vec2.scale(this.elements, this.elements, num);
	return this;
}

VENUS.Vector2.prototype.distance = function(vector2) {
	return vec2.distance(this.elements, vector2.elements);
}

VENUS.Vector2.prototype.length = function() {
	return vec2.length(this.elements);
}

VENUS.Vector2.prototype.negate = function() {
	vec2.negate(this.elements, this.elements);
	return this;
}

VENUS.Vector2.prototype.normalize = function(){
	vec2.normalize(this.elements, this.elements);
	return this;
}

VENUS.Vector2.prototype.dot = function(vector2){
	vec2.dot(this.elements, vector2.elements);
	return this;
}

VENUS.Vector2.prototype.cross = function(vector2){
	vec2.cross(this.elements, vector2.elements);
	return this;
}

VENUS.Vector2.prototype.toString = function(){
	return vec2.str(this.elements);
}
