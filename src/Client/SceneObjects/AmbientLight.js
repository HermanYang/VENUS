VENUS.AmbientLight = function(lightValueVector3){
	VENUS.Light.call(this, lightValueVector3);
}

VENUS.AmbientLight.prototype = Object.create(VENUS.Light.prototype);
