VENUS.SceneNode = function(object) {
	this.sceneObject = object === undefined ? null: object;
	this.parent = null;
	this.children = [];
};

VENUS.SceneNode.prototype.addChild = function(child) {
	this.children.push(child);
	child.parent = this;
	return this;
};

VENUS.SceneNode.prototype.removeChild = function(child) {
	for (var i = 0; i < children.length; i++) {
		if (children[i] == child) {
			this.children.splice(i, 1);
			return true;
		}
	}
	return false;
}

