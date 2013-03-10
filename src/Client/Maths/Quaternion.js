VENUS.Quaternion = function(vector4){
	this.value = vector4;
}

VENUS.Quaternion.prototype.copy = function(quat){
	this.value.copy(quat.value);
	return this;
}

VENUS.Quaternion.prototype.identity = function(){
	this.value.identity();
}

VENUS.Quaternion.prototype.setAxisAngle = function(axis, rad){
	quat.setAxisAngle(this.value, axis, rad);
	return this;
}

VENUS.Quaternion.prototype.multiply = function(quat){
	quat.multiply(this.value, this.value, quat.value);
	return this;
}

VENUS.Quaternion.prototype.scale = function(num){
	this.value.scale(num);
	return this;
}

VENUS.Quaternion.prototype.invert = function(){
	quat.inver(this.value, this.value);
	return this;
}
