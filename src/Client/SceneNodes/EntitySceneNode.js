VENUS.EntitySceneNode = function(entity){
	if(!(entity instanceof VENUS.Entity) || entity === undefined){
		alert("EntitySceneNode should attach an Entity");
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
