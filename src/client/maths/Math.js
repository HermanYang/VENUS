VENUS.Math = {};

VENUS.Math.degreeToRadian = function(degree){
	return (degree / 180) * Math.PI;
};

VENUS.Math.cos = function(degree){
	return Math.cos(VENUS.Math.degreeToRadian(degree));
};
