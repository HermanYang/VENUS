VENUS.SpecularLight = function( lightValueVector3, directorVector3, shine) {
	VENUS.Light.call(this, lightValueVector3);
	this.lightValueVector3 = lightValueVector3;
	this.directorVector3 = directorVector3;
	this.shine = shine;
}

VENUS.SpecularLight.prototype = Object.create(VENUS.Light.prototype);
