VENUS.PerspectiveCamera = function(fovyDegree, aspect, near, far){
	VENUS.Camera.call(this);

	fovyRadian = VENUS.Math.degreeToRadian(fovyDegree);
	this._projectionMatrix = VENUS.Matrix44.createPerspectiveMatrix(fovyRadian, aspect, near, far);
};

VENUS.PerspectiveCamera.prototype = Object.create(VENUS.Camera.prototype);

VENUS.PerspectiveCamera.prototype.getProjectionMatrix = function(){
	return this._projectionMatrix;
}	
