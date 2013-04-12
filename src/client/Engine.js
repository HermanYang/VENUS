VENUS.Engine = function() {
	this._canvas = document.createElement("canvas");

	var gl = this._canvas.getContext("experimental-webgl");
	SharedUtil.assert(gl !== null, "webgl is not supported in this browser!");

	this._resManager = new VENUS.ResourceManager();
	this._webglRenderer = new VENUS.WebGLConfiguration(gl);
	this._sceneManager = new VENUS.SceneManager();

	this._container = null;
	this._webglConst = new VENUS.WebGLConstants(gl);
	this._userInputHelper = new VENUS.UserInputHelper();

	this._isFullScreen = false;

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
	document.body.style.cursor = "none";
	/*document.addEventListener("fullscreenchanged",  ,false);
	document.addEventListener("pointerlockchange",  ,false);*/
};

VENUS.Engine.prototype.setFullScreen = function(isFullScreen) {
	this._isFullScreen = isFullScreen;
	this.setCanvasSize(document.body.clientWidth, document.body.clientHeight);
};

VENUS.Engine.prototype.getResourceManager = function() {
	return this._resManager;
};

VENUS.Engine.prototype.getWebGLConfiguration = function() {
	return this._webglRenderer;
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
		this._webglRenderer.setSize(width, height);
	}
};

VENUS.Engine.prototype.getFrameRate = function() {

};

VENUS.Engine.prototype.run = function() {
	var context = this;
	var render = function() {
		requestAnimationFrame(render);
		context._sceneManager.renderScene();
	};
	render();
};

