VENUS.Math = {};

VENUS.Math.degreeToRadian = function(degree){
	return (degree / 180) * Math.PI;
};

VENUS.Math.cos = function(degree){
	return Math.cos(VENUS.Math.degreeToRadian(degree));
};

VENUS.Math.tan = function(degree){
	return Math.tan(VENUS.Math.degreeToRadian(degree));
};

VENUS.Math.random = function(start, end){
	var delta = Math.random();
	var random = start + (end - start) * delta;
	return random;
};

VENUS.Math.max = function(a, b){
	return Math.max(a, b);
};
