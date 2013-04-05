VENUS.SkyBoxSceneNode= function(entity){
	if(entity !== undefined){
		SharedUtil.assert(entity instanceof VENUS.Entity, "EntitySceneNode can just attach with entity");
	}	

	VENUS.MovableSceneNode.call(this, entity);

	this.scale = new VENUS.Vector3(1, 1, 1);
}

VENUS.SkyBoxSceneNode.prototype = Object.create(VENUS.MovableSceneNode.prototype);

VENUS.SkyBoxSceneNode.prototype.getModelMatrix = function() {
	var transformMatrix = this.getTransformMatrix();
	transformMatrix.scale(this.scale);
	return transformMatrix;
}

VENUS.SkyBoxSceneNode.prototype.setScale = function(vector3){
	this.scale = vector3;
}

VENUS.SkyBoxSceneNode.prototype.setSceneObject = function( obj ){
	SharedUtil.assert(obj instanceof VENUS.Entity, "EntitySceneNode can just attach with entity");
	this._sceneObject = obj;
}

VENUS.SkyBoxSceneNode.prototype.render = function(projectionMatrix, viewMatrix){
	var sceneManager = VENUS.Engine.getInstance().getSceneManager();
	var position = sceneManager.getCurrentScene().getCurrentCameraSceneNode().getPosition();
	this.setPosition(position);

	this._sceneObject.render(projectionMatrix, viewMatrix, this.getModelMatrix());
	this._animate();
}
