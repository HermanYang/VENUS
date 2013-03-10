VENUS.LightSceneNode = function(light) {
	if (! (light instanceof VENUS.Light) || light === undefined) {
		alert("LightSceneNode should attach a light");
	}
	VENUS.MovableSceneNode(this, light);
}

VENUS.LightSceneNode.prototype = Object.create(VENUS.MovableSceneNode.prototype);

VENUS.LightSceneNode.prototype.getLightPosition = function(){
	if(!(light instanceof AmbientLight)){
		alert("It is so wired to get the position of an ambient light");
	}
	return this.position;
}

