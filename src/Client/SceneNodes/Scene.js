VENUS.Scene = function() {
	this._root = new VENUS.SceneNode();
	this._sceneNodeList = [];
	this._currentCameraNode = null;
}

VENUS.Scene.prototype.getRootSceneNode = function() {
	return this._root;
}

VENUS.Scene.prototype.getSceneNodeByName = function() {
}

VENUS.Scene.prototype.getSceneNodeById = function() {}

VENUS.Scene.prototype.renderScene = function() {

	var gl = VENUS.Engine.getInstance().getWebGLConfiguration().getContext();

	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);

	var cameraNode = this.getCurrentCameraNode();

	var viewMatrix = new VENUS.Matrix44(cameraNode.getViewMatrix());
	var projectionMatrix = cameraNode.getProjectionMatrix();

	var sceneList = this._root.getDescendants();

	for (var i in sceneList) {
		var node = sceneList[i];
		if (node.isRenderable()) {
			node.render(projectionMatrix, viewMatrix);
		}
	}

}

VENUS.Scene.prototype.getCurrentCameraNode = function() {
	return this._currentCameraNode;
}

VENUS.Scene.prototype.setCurrentCameraNode = function(cameraNode) {
	VENUS.assert(cameraNode !== undefined && cameraNode instanceof VENUS.CameraSceneNode, "setCurrentCamera need parameters");
	this._currentCameraNode = cameraNode;
}

VENUS.Scene.prototype.createPerspectiveCameraSceneNode = function(fovyDegree, near, far, name) {
	var engine = VENUS.Engine.getInstance();
	var aspect = engine.getCanvasWidth() / engine.getCanvasHeight();
	var camera = new VENUS.PerspectiveCamera(fovyDegree, aspect, near, far);
	var node = new VENUS.CameraSceneNode(camera);

	if (name !== undefined) {
		node.setName(name);
	}

	// add scene node to list in order to manage them 
	this._sceneNodeList.push(node);

	return node;
}

VENUS.Scene.prototype.createEntitySceneNode = function(name) {
	var entity = new VENUS.Entity();
	var node = new VENUS.EntitySceneNode(entity);

	if (name !== undefined) {
		node.setName(name);
	}

	// add scene node to list in order to manage them 
	this._sceneNodeList.push(node);

	return node;
}

