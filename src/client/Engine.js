VENUS.Engine = function() {
	this._canvas = document.createElement("canvas");

	var gl = this._canvas.getContext("experimental-webgl");
	var canvas2DContext = this._canvas.getContext("2d");

	SharedUtil.assert(gl !== null, "webgl is not supported in this browser!");

	this._resManager = new VENUS.ResourceManager();
	this._webglConfiguration = new VENUS.WebGLConfiguration(gl);
	this._sceneManager = new VENUS.SceneManager();

	this._container = null;
	this._webglConst = new VENUS.WebGLConstants(gl);
	this._userInputHelper = new VENUS.UserInputHelper();

	this._isFullScreen = false;
	this._pause = false;

	this.setCanvasSize(document.body.clientWidth, document.body.clientHeight);

	this._initialize();
};

VENUS.Engine._instance = null;

VENUS.Engine.getInstance = function() {
	if (VENUS.Engine._instance == null) {
		VENUS.Engine._instance = new VENUS.Engine();
	}
	return VENUS.Engine._instance;
};

VENUS.Engine.getWebGLConstants = function() {
	var engine = this.getInstance();
	return engine._webglConst;
};

VENUS.Engine.prototype._initialize = function() {
	var self = this;

	var onWindowSizeChangedDefault = function() {
		self.setCanvasSize(document.body.clientWidth, document.body.clientHeight);
	};

	window.addEventListener("resize", onWindowSizeChangedDefault, false);
};

VENUS.Engine.prototype.setFullScreen = function(isFullScreen) {
	this._isFullScreen = isFullScreen;
	this.setCanvasSize(document.body.clientWidth, document.body.clientHeight);
};

VENUS.Engine.prototype.addOnPointerLockChangedHandler = function(callback) {
	document.addEventListener("webkitpointerlockchange", callback, false);
};

VENUS.Engine.prototype.addOnWindowSizeChangedHandler = function(callback) {
	window.addEventListener("resize", callback, false);
};

VENUS.Engine.prototype.getResourceManager = function() {
	return this._resManager;
};

VENUS.Engine.prototype.getWebGLConfiguration = function() {
	return this._webglConfiguration;
};

VENUS.Engine.prototype.getSceneManager = function() {
	return this._sceneManager;
};

VENUS.Engine.prototype.getUserInputHelper = function() {
	return this._userInputHelper;
};

VENUS.Engine.prototype.getCanvas = function() {
	return this._canvas;
};

VENUS.Engine.prototype.getCanvasWidth = function() {
	return this._canvas.width;
};

VENUS.Engine.prototype.getCanvasHeight = function() {
	return this._canvas.height;
};

VENUS.Engine.prototype.attachContainer = function(container) {
	this._container = container;
	container.appendChild(this._canvas);
};

VENUS.Engine.prototype.setCanvasSize = function(width, height, affactViewPort) {
	this._canvas.width = width;
	this._canvas.height = height;

	if (affactViewPort === undefined || affactViewPort == true) {
		this._webglConfiguration.setSize(width, height);
	}
};

VENUS.Engine.prototype.getFrameRate = function() {

};

VENUS.Engine.prototype.run = function() {
	var self = this;
	var render = function() {
		requestAnimationFrame(render);
		if (!self._pause) {
			self._sceneManager.renderScene();
		}
	};
	render();
};

VENUS.Engine.prototype.pause = function() {
	/*this._pause = true;*/
};

VENUS.Engine.prototype.resume = function() {
	this._pause = false;
};

