/*
 *This class is used to store webgl global information  
 *and configurate webgl in order to decouple venus and webgl 
 */
VENUS.WebGLConfiguration = function(context) {
	this._defaultClearColor = new VENUS.Vector4(0, 0, 0, 1);
	this._context = context;
}

VENUS.WebGLConfiguration.prototype.setSize = function(width, height){
	this._context.viewport(0, 0, width, height);
};

VENUS.WebGLConfiguration.prototype.getContext = function(){
	return this._context;
};
