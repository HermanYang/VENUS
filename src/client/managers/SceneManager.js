VENUS.SceneManager = function() {
	this._scene = {};
	this._currentScene = null;
}

VENUS.SceneManager.prototype.createScene = function(sceneName) {
	SharedUtil.assert(!this._scene.hasOwnProperty(sceneName), "scene name is already exist!");
	var scene = new VENUS.Scene();
	this._scene[sceneName] = scene;

	return scene;
}

VENUS.SceneManager.prototype.setCurrentScene = function(scene) {
	this._currentScene = scene;
}

VENUS.SceneManager.prototype.getCurrentScene = function() {
	return this._currentScene;
}


VENUS.SceneManager.prototype.renderScene = function() {
	this._currentScene.render();
};

