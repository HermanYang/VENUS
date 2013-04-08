VENUS.Math = {};

VENUS.Math.degreeToRadian = function(degree){
	return (degree / 180) * Math.PI;
};

VENUS.Math.cos = function(degree){
	return Math.cos(VENUS.Math.degreeToRadian(degree));
};

VENUS.Math.random = function(start, end){
	var delta = Math.random();
	var random = start + (end - start) * delta;
	return random;
};
