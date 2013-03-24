VENUS.EntitySceneNode = function(entity){
	if(entity !== undefined){
		VENUS.assert(entity instanceof VENUS.Entity, "EntitySceneNode can just attach with entity")
	}	
	VENUS.MovableSceneNode.call(this, entity);

	this.scale = new VENUS.Vector3(1, 1, 1);
}

VENUS.EntitySceneNode.prototype = Object.create(VENUS.MovableSceneNode.prototype);

VENUS.EntitySceneNode.prototype.getModelMatrix = function() {
	var transformMatrix = this.getTransformMatrix();
	transformMatrix.scale(this.scale);
	return transformMatrix;
}

VENUS.EntitySceneNode.prototype.setScale = function(vector3){
	this.scale = vector3;
}

VENUS.EntitySceneNode.prototype.setSceneObject = function( obj ){
	VENUS.assert(obj instanceof VENUS.Entity, "EntitySceneNode can just attach with entity");
	this._sceneObject = obj;
}

VENUS.EntitySceneNode.prototype.render = function(projectionMatrix, viewMatrix){
	var modelViewMatrix = new VENUS.Matrix44(viewMatrix);
	modelViewMatrix.multiply(this.getModelMatrix());
	this._sceneObject.render(projectionMatrix, modelViewMatrix);
}
