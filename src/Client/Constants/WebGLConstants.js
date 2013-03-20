VENUS.WebGLConstants = function(context) {
	this._context = context;
	this._initialize();
};

VENUS.WebGLConstants.prototype._initialize = function(){
	var gl = this._context;

	this.SHADER_TYPE_FRAGMENT = gl.FRAGMENT_SHADER;
	this.SHADER_TYPE_VERTEX = gl.VERTEX_SHADER;

	this.UNSIGNED_SHORT = gl.UNSIGNED_SHORT;
	
	this.STATIC_DRAW = gl.STATIC_DRAW;
	this.DYNAMIC_DRAW = gl.DYNAMIC_DRAW;
	this.STREAM_DRAW = gl.STREAM_DRAW;
	
	this.ARRAY_BUFFER = gl.ARRAY_BUFFER;
	this.ELEMENT_ARRAY_BUFFER = gl.ELEMENT_ARRAY_BUFFER;

	this.TRIANGLES = gl.TRIANGLES;
};
