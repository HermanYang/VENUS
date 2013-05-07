PausingPage = function(instructionBox) {
	this._div = document.createElement("div");

	this._div.style.position = "absolute";
	this._div.style.backgroundColor = "black";
	this._div.style.opacity = 0.5;
	this._div.style.cursor = "pointer";

	this._divButton = document.createElement("div");
	this._divButton.style.position = "absolute";
	this._divButton.style.textAlign = "center";
	this._divButton.style.color = "#ff0000";
	this._divButton.style.cursor = "pointer";
	this._divButton.style.fontSize = "40px";
	this._divButton.innerHTML = "Resume";

	this._instructionBox = instructionBox;

	this._div.appendChild(this._divButton);
	this._div.appendChild(this._instructionBox.getContainer());

	this.resize();
	var self = this;
	var onSizeChanged = function() {
		self.resize();
	};
	window.addEventListener("resize", onSizeChanged, false);
};

PausingPage.prototype.getContainer = function() {
	return this._div;
};

PausingPage.prototype.resize = function() {
	var clientWidth = document.body.clientWidth;
	var clientHeight = document.body.clientHeight;

	this._div.style.width = clientWidth;
	this._div.style.height = clientHeight;
	this._div.style.left = 0;
	this._div.style.top = 0;

	var divWidth = 100;
	var divHeight = 30;

	this._divButton.style.width = divWidth;
	this._divButton.style.height = divHeight;
	this._divButton.style.left = clientWidth / 2 - divWidth / 2;
	this._divButton.style.top = clientHeight / 2 - divHeight / 2;

	this._instructionBox.setPosition((clientWidth * 2) / 3, clientHeight / 3);
};

PausingPage.prototype.setOnResumeButtonClickHandler = function(callback) {
	this._divButton.addEventListener("click", callback, false);
};

