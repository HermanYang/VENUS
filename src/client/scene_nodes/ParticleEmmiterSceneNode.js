VENUS.ParticleEmmiterSceneNode = function(particleEmmiter){
	if(particleEmmiter !== undefined){
		SharedUtil.assert(particleEmmiter instanceof VENUS.ParticleEmmiter, "ParticleEmmiterSceneNode can just attach with ParticleEmmiter");
	}
	VENUS.MovableSceneNode.call(this, particleEmmiter);
};

VENUS.ParticleEmmiterSceneNode.prototype = Object.create(VENUS.MovableSceneNode.prototype);

VENUS.ParticleEmmiterSceneNode.prototype.render = function(){
	this._sceneObject.render();
};

