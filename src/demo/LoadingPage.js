LoadingPage = function(instructionBox) {
	this._div = document.createElement("div");
	this._canvas = document.createElement("canvas");
	this._divButton = document.createElement("div");

	this._instruction = instructionBox;

	this._canvas.width = document.body.clientWidth;
	this._canvas.height = document.body.clientHeight;

	this._context2D = this._canvas.getContext("2d");
	this._onStartButtonClickCallback = null;

	this._maxProgress = 100;
	this._currentProgress = 0;

	this._progressBarWidth = this._canvas.width / 3;
	this._progressBarHeight = 50;

	this._intervalId = 0;

	var divWidth = 100;
	var divHeight = 30;
	var offset = 10;

	this._divButton.style.position = "absolute";
	this._divButton.style.width = divWidth;
	this._divButton.style.height = divHeight;
	this._divButton.style.left = this._canvas.width / 2 - divWidth / 2;
	this._divButton.style.top = this._canvas.height / 2 + this._progressBarHeight / 2 + offset;
	this._divButton.style.textAlign = "center";
	this._divButton.style.color = "#ff0000";
	this._divButton.style.cursor = "default";
	this._divButton.style.fontSize = "40px";

	this._instruction.setPosition((this._canvas.width * 2) / 3 + offset, this._canvas.height / 3);

	this._div.appendChild(this._canvas);
	this._div.appendChild(this._divButton);
	this._div.appendChild(this._instruction.getContainer());
};

LoadingPage.prototype.setProgress = function(progress) {
	var pen = this._context2D;

	progress = Math.min(progress, this._maxProgress);

	pen.clearRect(0, 0, pen.canvas.clientWidth, pen.canvas.clientHeight);

	var left = this._progressBarWidth;
	var top = (this._canvas.height / 2) - (this._progressBarHeight / 2);
	var width = this._progressBarWidth;
	var height = this._progressBarHeight;

	pen.fillStyle = "#BDBDBD";
	pen.fillRect(left, top, width * progress / this._maxProgress, height);

	pen.lineWidth = 3;
	pen.strokeRect(left, top, width, height);

	this._currentProgress = progress;
};

LoadingPage.prototype.setOnStartButtonClickHandler = function(callback) {
	this._divButton.addEventListener("click", callback, false);
};

LoadingPage.prototype.getContainer = function() {
	return this._div;
};

LoadingPage.prototype.startLoading = function() {

	this._divButton.innerHTML = "loading...";

	var progress = 0;
	var self = this;
	var interval = 50;

	var draw = function() {
		if (progress < 75) {
			progress += 1;
			self.setProgress(progress);
			return true;
		}
		return false;
	};

	this._intervalId = setInterval(function() {
		if (!draw()) {
			clearInterval(self.intervalId);
		}
	},
	interval);

};

LoadingPage.prototype.finishLoading = function() {
	var self = this;
	var progress = this._currentProgress;

	clearInterval(this._intervalId);

	var draw = function() {
		if (progress < 100) {
			progress += 2;
			self.setProgress(progress);
			return true;
		}

		self._divButton.innerHTML = "Start";
		self._divButton.style.cursor = "pointer";
		return false;
	};

	var intervalId = setInterval(function() {
		if (!draw()) {
			clearInterval(intervalId);
		}
	},
	50);

};

