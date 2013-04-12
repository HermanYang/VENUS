VENUS.SceneNode = function(object) {
	this._sceneObject = object === undefined ? null: object;
	this._parent = null;
	this._children = [];
	this._name = "";
	this._id = SharedUtil.getUniqueId();
};

VENUS.SceneNode.prototype.addChild = function(child) {
	this._children.push(child);
	child._parent = this;
	return this;
};

VENUS.SceneNode.prototype.removeChild = function(child) {
	var children = this._children;
	for (var i = 0; i < children.length; i++) {
		if (children[i] == child) {
			this.children.splice(i, 1);
			return true;
		}
	}
	return false;
}

VENUS.SceneNode.prototype.setName = function(name) {
	this._name = name;
};

VENUS.SceneNode.prototype.getName = function() {
	return this._name;
};

VENUS.SceneNode.prototype.getDescendants = function() {
	var children = this._children;
	var descendants = [];

	// add children to descendant list
	for (var i in children) {
		descendants.push(children[i]);
	}

	// add all descendants of children
	for (var i in children) {
		var child = children[i];
		li = child.getDescendants();
		for (var j in li) {
			descendants.push(li[j]);
		}
	}
	return descendants;
}

VENUS.SceneNode.prototype.getSceneObject = function() {
	return this._sceneObject;
}

VENUS.SceneNode.prototype.setSceneObject = function(obj) {
	this._sceneObject = obj;
}

VENUS.SceneNode.prototype.isRenderable = function() {
	var isRenderable = this._sceneObject instanceof VENUS.RenderableObject;
	return isRenderable;
}

VENUS.SceneNode.prototype.isLight = function(){
	var isLight = this._sceneObject instanceof VENUS.Light;
	return isLight;
}

VENUS.SceneNode.prototype.isTransparent = function(){
	var isTransparent = false; 
	if(this.isRenderable){
		isTransparent = this._sceneObject.isTransparent();
	}
	return isTransparent;
}
