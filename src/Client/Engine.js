VENUS.Engine = function() {
	this._canvas = document.createElement("canvas");
	this._canvas.style.height = "500";
	this._canvas.style.width = "500";

	try {

		this._context = this._canvas.getContext("experimental-webgl");
	}
	catch(e) {
		alert("webgl not supported!");
	}

	this._resManager = new VENUS.ResourceManager();
	this._renderer = new VENUS.WebGLRenderer();
}

VENUS.Engine._instance = null;

VENUS.Engine.getInstance = function() {
	if (VENUS.Engine._instance == null) {
		VENUS.Engine._instance = new VENUS.Engine();
	}
	return VENUS.Engine._instance;
}

VENUS.Engine.prototype.getResourceManager = function() {
	return this._resManager;
}

VENUS.Engine.prototype.getRenderer = function() {
	return this._renderer;
}

VENUS.Engine.prototype.getContext = function(){
	return this._context;
}

VENUS.Engine.prototype.getCanvas = function(){
	return this._canvas;
}

