VENUS.LightSceneNode = function(light) {
	if (light !== undefined) {
		SharedUtil.assert(light instanceof VENUS.Light, "LightSceneNode can just attach with light")
	}

	VENUS.MovableSceneNode.call(this, light);
};

VENUS.LightSceneNode.prototype = Object.create(VENUS.MovableSceneNode.prototype);

VENUS.LightSceneNode.prototype.getLightPosition = function() {
	return this.position;
};

VENUS.LightSceneNode.prototype.getModelMatrix = function() {
	 return this.getTransformMatrix();
}

VENUS.LightSceneNode.prototype.getLightType = function() {
	if (this._sceneObject instanceof VENUS.DirectionLight) {
		return VENUS.TYPE_LIGHT_DIRECTION;
	}

	if (this._sceneObject instanceof VENUS.PointLight) {
		return VENUS.TYPE_LIGHT_POINT;
	}

	if(this._sceneObject instanceof VENUS.SpotLight){
		return VENUS.TYPE_LIGHT_SPOT;
	}
};

