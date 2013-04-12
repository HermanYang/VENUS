VENUS.BillboardSceneNode = function(billboard){
	if(billboard !== undefined){
		SharedUtil.assert(billboard instanceof VENUS.Billboard, "BillboardSceneNode can just attach with Billboard");
	}
	VENUS.MovableSceneNode.call(this, billboard);
};

VENUS.BillboardSceneNode.prototype = Object.create(VENUS.MovableSceneNode.prototype);


VENUS.BillboardSceneNode.prototype.render = function(projectionMatrix, cameraPosition, viewMatrix){
	var position = new VENUS.Vector3(0, 0, 0);
	position.clone(this.getPosition());

	this._sceneObject.render(projectionMatrix, viewMatrix, position);
};

