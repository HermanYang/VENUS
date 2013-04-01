VENUS.SceneObject = function() {
	this._id = SharedUtil.getUniqueId();
}

VENUS.SceneObject.prototype.getId = function() {
	return this._id;
};

