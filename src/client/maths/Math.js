VENUS.Math = {};

VENUS.Math.degreeToRadian = function(degree) {
	return (degree / 180) * Math.PI;
};

VENUS.Math.radianToDegree = function(radian) {
	return (radian / Math.PI) * 180;
};

VENUS.Math.cos = function(degree) {
	return Math.cos(VENUS.Math.degreeToRadian(degree));
};

VENUS.Math.tan = function(degree) {
	return Math.tan(VENUS.Math.degreeToRadian(degree));
};

VENUS.Math.random = function(start, end) {
	var delta = Math.random();
	var random = start + (end - start) * delta;
	return random;
};

VENUS.Math.max = function(a, b) {
	return Math.max(a, b);
};

VENUS.Math.arccos = function(cosDegree) {
	return VENUS.Math.radianToDegree(Math.acos(cosDegree));
};

