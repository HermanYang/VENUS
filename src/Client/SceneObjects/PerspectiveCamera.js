VENUS.PerspectiveCamera = function(fovyDegree, aspect, near, far){
	VENUS.Camera.call(this);
	fovyRadian = VENUS.Math.degreeToRadian(fovyDegree);
	this._projectMatrix = VENUS.Matrix44.createPerspectiveMatrix(fovyRadian, aspect, near, far);
}

VENUS.PerspectiveCamera.prototype = Object.create(VENUS.Camera.prototype);

VENUS.PerspectiveCamera.prototype.getProjectMatrix = function(){
	return this._projectMatrix;
}	
