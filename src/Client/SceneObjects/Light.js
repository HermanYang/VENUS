VENUS.Light = function(lightValueVector3){
	VENUS.SceneObject.call(this);
	this.lightValue = lightValueVector3;
}

VENUS.Light.prototype = Object.create(VENUS.SceneObject.prototype);

