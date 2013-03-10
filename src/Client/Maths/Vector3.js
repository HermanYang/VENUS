VENUS.Vector3 = function(x, y, z) {
	this.elements = vec3.fromValues(x, y, z);
}

VENUS.Vector3.prototype.clone = function() {
}

VENUS.Vector3.prototype.setelements = function(x, y, z) {
	vec3.set(this.elements, x, y, z);
	return this;
}

VENUS.Vector3.prototype.add = function(vector3) {
	vec3.add(this.elements, this.elements, vector3.elements);
	return this;
}

VENUS.Vector3.prototype.subtract = function(vector3) {
	vec3.subtract(this.elements, this.elements, vector3.elements);
	return this;
}

VENUS.Vector3.prototype.divide = function(vector3) {
	vec3.divide(this.elements, this.elements, vector3.elements);
	return this;
}

VENUS.Vector3.prototype.scale = function(num) {
	vec3.scale(this.elements, this.elements, num);
	return this;
}

VENUS.Vector3.prototype.distance = function(vector3) {
	return vec3.distance(this.elements, vector3.elements);
}

VENUS.Vector3.prototype.squareDistance = function(vector3) {
	return vec3.squareDistance(this.elements, vector3.elements);
}

VENUS.Vector3.prototype.length = function() {
	return vec3.length(this.elements);
}

VENUS.Vector3.prototype.negate = function() {
	vec3.negate(this.elements, this.elements);
	return this;
}

VENUS.Vector3.prototype.normalize = function() {
	vec3.normalize(this.elements, this.elements);
	return this;
}

VENUS.Vector3.prototype.dot = function(vector3) {
	vec3.dot(this.elements, vector3.elements);
	return this;
}

VENUS.Vector3.prototype.cross = function(vector3) {
	vec3.cross(this.elements, this.elements, vector3.elements);
	return this;
}

VENUS.Vector3.prototype.applyMatrix = function(matrix44) {
	vec3.transformMat4(this.elements, this.elements, matrix44.elements);
	return this;
}

VENUS.Vector3.prototype.toString = function() {
	return vec3.str(this.elements);
}

