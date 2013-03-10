VENUS.PerspectiveCamera = function(fovyDegree, aspect, near, far){
	fovyRadian = VENUS.Math.degreeToRadian(fovyDegree);
	this.projectMatrix = VENUS.Matrix44.createPerspectiveMatrix(fovyRadian, aspect, near, far);
}

VENUS.PerspectiveCamera.prototype = Object.create(VENUS.Camera.prototype);
