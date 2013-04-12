VENUS.Vector3 = function(x, y, z) {
	if (arguments.length === 0) {
		this._elements = vec3.create();
	}
	this._elements = vec3.fromValues(x, y, z);
};

VENUS.Vector3.prototype.clone = function() {
	var vector3 = new VENUS.Vector3();
	vector3.copy(this);
	return vector3;
};

VENUS.Vector3.prototype.setValue = function(x, y, z) {
	vec3.set(this._elements, x, y, z);
};

VENUS.Vector3.prototype.getElements = function() {
	return this._elements;
};

VENUS.Vector3.prototype.copy = function(vector3) {
	this._elements = vec3.clone(vector3.getElements());
};

VENUS.Vector3.prototype.add = function(vector3) {
	vec3.add(this._elements, this._elements, vector3.getElements());
	return this;
};

VENUS.Vector3.prototype.getX = function() {
	return this._elements[0];
};

VENUS.Vector3.prototype.getY = function() {
	return this._elements[1];
};

VENUS.Vector3.prototype.getZ = function() {
	return this._elements[2];
};

VENUS.Vector3.prototype.subtract = function(vector3) {
	vec3.subtract(this._elements, this._elements, vector3.getElements());
	return this;
};

VENUS.Vector3.prototype.divide = function(vector3) {
	vec3.divide(this._elements, this._elements, vector3.getElements());
	return this;
};

VENUS.Vector3.prototype.scale = function(num) {
	vec3.scale(this._elements, this._elements, num);
	return this;
};

VENUS.Vector3.prototype.distance = function(vector3) {
	return vec3.distance(this._elements, vector3.getElements());
};

VENUS.Vector3.prototype.squareDistance = function(vector3) {
	return vec3.squareDistance(this._elements, vector3.getElements());
};

VENUS.Vector3.prototype.length = function() {
	return vec3.length(this._elements);
};

VENUS.Vector3.prototype.negate = function() {
	vec3.negate(this._elements, this._elements);
	return this;
};

VENUS.Vector3.prototype.normalize = function() {
	vec3.normalize(this._elements, this._elements);
	return this;
};

VENUS.Vector3.prototype.dot = function(vector3) {
	vec3.dot(this._elements, vector3.getElements());
	return this;
};

VENUS.Vector3.prototype.cross = function(vector3) {
	vec3.cross(this._elements, this._elements, vector3.getElements());
	return this;
};

VENUS.Vector3.prototype.applyMatrix = function(matrix44) {
	vec3.transformMat4(this._elements, this._elements, matrix44.getElements());
};

VENUS.Vector3.prototype.toString = function() {
	return vec3.str(this._elements);
};

