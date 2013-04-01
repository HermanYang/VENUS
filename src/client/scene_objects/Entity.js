VENUS.Entity = function() {
	VENUS.RenderableObject.call(this);

	this._mesh = new VENUS.Mesh();
	this._material = new VENUS.Material();

	this._gl = VENUS.Engine.getInstance().getWebGLConfiguration().getContext();

	this._renderer = new VENUS.WebGLEntityRenderer(this);
};

// inherit from RenderableObject
VENUS.Entity.prototype = Object.create(VENUS.RenderableObject.prototype);

VENUS.Entity.prototype.getMesh = function() {
	return this._mesh;
};

VENUS.Entity.prototype.setMesh = function(mesh) {
	this._mesh = mesh;
};

VENUS.Entity.prototype.getMaterial = function() {
	return this._material;
};

VENUS.Entity.prototype.render = function(projectionMatrix, viewMatrix, modelMatrix) {
	this._renderer.render(projectionMatrix, viewMatrix, modelMatrix);
}
