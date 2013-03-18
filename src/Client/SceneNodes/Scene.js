VENUS.Scene = function() {
	this._root = new VENUS.SceneNode();
}

VENUS.Scene.prototype.getRootSceneNode = function() {
	return this._root;
}

VENUS.Scene.prototype.getSceneNodeByName = function() {

}

VENUS.Scene.prototype.getSceneNodeById = function() {}

VENUS.Scene.prototype.renderScene = function() {}

VENUS.Scene.prototype.createPerspectiveCameraSceneNode = function( fovyDegree, near, far) {
	var engine = VENUS.Engine.getInstance();
	var aspect = engine.getCanvasWidth() / engine.getCanvasHeight();
	var camera = new VENUS.PerspectiveCamera(fovyDegree, aspect, near, far);
	var cameraNode = new VENUS.CameraSceneNode(camera);

	return cameraNode;
}

VENUS.Scene.prototype.createEntitySceneNode = function(){

}

