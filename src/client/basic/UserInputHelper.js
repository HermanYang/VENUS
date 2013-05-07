VENUS.UserInputHelper = function() {
	this._keyDownCallbacks = [];
	this._mouseMoveCallbacks = [];
	this._keyUpCallbacks = [];

	var context = this;
	var onKeyDown = function(event) {
		for (var i = 0; i < context._keyDownCallbacks.length; ++i) {
			context._keyDownCallbacks[i](event);
		}
	};

	var onMouseMove = function(event){
		for(var i = 0; i < context._mouseMoveCallbacks.length; ++i){
			context._mouseMoveCallbacks[i](event);
		}
	};

	var onKeyUp = function(event){
		for(var i = 0; i < context._keyUpCallbacks.length; ++i){
			context._keyUpCallbacks[i](event);
		}
	};

	document.addEventListener("keydown", onKeyDown, false);
	document.addEventListener("keyup", onKeyUp, false);
	document.addEventListener("mousemove", onMouseMove, false);

};

/*
 *The callback function has an argument to recieve event that contain keyCode
 */
VENUS.UserInputHelper.prototype.addOnKeyDownCallback = function(callback) {
	this._keyDownCallbacks.push(callback);
};

VENUS.UserInputHelper.prototype.addOnMouseMoveCallback = function(callback){
	this._mouseMoveCallbacks.push(callback);
};

VENUS.UserInputHelper.prototype.addOnKeyUpCallback = function(callback){
	this._keyUpCallbacks.push(callback);
};
