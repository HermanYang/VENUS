VENUS.WebGLRenderer = function(obj) {
	VENUS.Renderer.call(this);
	this._renderableObject = obj === undefined ? null : obj;
}

VENUS.WebGLRenderer.prototype = Object.create(VENUS.Renderer.prototype);
