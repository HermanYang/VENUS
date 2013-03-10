VENUS.Entity = function(mesh, material) {
	VENUS.RenderabelObject.call(this);

	this.mesh = mesh;
	this.material = material;	
};

// inherit from RenderabelObject
VENUS.Entity.prototype = Object.create(VENUS.RenderabelObject.prototype);
