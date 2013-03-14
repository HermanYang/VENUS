VENUS.WebGLRenderer = function() {
}

VENUS.WebGLRenderer.prototype.setSize = function(width, height){
	var gl = VENUS.Engine.getInstance().getContext();
	gl.viewport(0, 0, width, height);
}

// render the scene
VENUS.WebGLRenderer.prototype.renderScene = function() {
	var gl = VENUS.Engine.getInstance().getContext();

	var cameraNode = scene.rootSceneNode.children[1];
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.viewport(0, 0, this.width, this.height);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

}
