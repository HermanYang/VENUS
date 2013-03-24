VENUS.RenderableObject = function() {
	VENUS.SceneObject.call(this);
}

VENUS.RenderableObject.prototype = Object.create(VENUS.SceneObject.prototype);

VENUS.RenderableObject.prototype.render = function(modelViewMatrix44) {
	// each sub class has its own render method.
}

