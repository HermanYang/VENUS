VENUS.DiffuseLight = function( lightValueVector3, directorVector3) {
	VENUS.Light.call(this, lightValueVector3);

	this.directorVector3 = directorVector3;
}

VENUS.DiffuseLight.prototype = Object.create(VENUS.Light.prototype);

