/*
 *special renderer to render Particle 
 */
VENUS.WebGLParticleRenderer = function(particleEmmiter) {
	VENUS.WebGLRenderer.call(this, particleEmmiter);

	this._context = VENUS.Engine.getInstance().getWebGLConfiguration().getContext();
	this._program = VENUS.Engine.getInstance().getResourceManager().getProgramByPath("/shaders/particle");

	this._particleDirectionBuffer = new VENUS.ArrayBuffer();
	this._particleSpeedBuffer = new VENUS.ArrayBuffer();
	this._particleLifeTimeBuffer = new VENUS.ArrayBuffer();
	this._particleElapseBuffer = new VENUS.ArrayBuffer();
};

VENUS.WebGLParticleRenderer.prototype = Object.create(VENUS.WebGLRenderer);

VENUS.WebGLParticleRenderer.prototype.render = function(projectionMatrix, viewMatrix, modelMatrix) {

	var gl = this._context;
	var program = this._program;
	program.bind();

	var webglConst = VENUS.Engine.getWebGLConstants();
	var particleEmmiter  = this._renderableObject;
	var vectorDimension = 0;

	var particleDirections = particleEmmiter.getParticleDirections();
	var particleSpeeds = particleEmmiter.getParticleSpeeds();
	var particleLifeTimes = particleEmmiter.getParticleLifeTimes();
	var particleElapses = particleEmmiter.getParticleElapses();


	vectorDimension = 3;
	this._particleDirectionBuffer.createBuffer(particleDirections, vectorDimension, webglConst.ARRAY_BUFFER, VENUS.FLOAT_ARRAY, webglConst.STATIC_DRAW );

	vectorDimension = 1;
	this._particleSpeedBuffer.createBuffer(particleSpeeds, vectorDimension, webglConst.ARRAY_BUFFER, VENUS.FLOAT_ARRAY, webglConst.STATIC_DRAW );

	vectorDimension = 1;
	this._particleLifeTimeBuffer.createBuffer(particleLifeTimes, vectorDimension, webglConst.ARRAY_BUFFER, VENUS.FLOAT_ARRAY, webglConst.STATIC_DRAW );

	vectorDimension = 1;
	this._particleElapseBuffer.createBuffer(particleElapses, vectorDimension, webglConst.ARRAY_BUFFER, VENUS.FLOAT_ARRAY, webglConst.STATIC_DRAW );

	this._particleDirectionBuffer.bindProgramAttribute(program, "aParticleDirection", 0, 0);
	this._particleSpeedBuffer.bindProgramAttribute(program, "aParticleSpeed",0, 0);
	this._particleLifeTimeBuffer.bindProgramAttribute(program, "aParticleLifeTime", 0, 0);
	this._particleElapseBuffer.bindProgramAttribute(program, "aParticleElapse", 0, 0);
	
	program.setUniformVector3("uCenterPosition", new VENUS.Vector3(0, 0,0));
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

	var texture = particleEmmiter.getTexture();
	program.setTexture("uTexture", texture, webglConst.LINEAR, webglConst.LINEAR, webglConst.CLAMP_TO_EDGE, webglConst.CLAMP_TO_EDGE);

	var length = particleDirections.length;
	VENUS.ArrayBuffer.drawArrays(webglConst.POINTS, length);

	gl.disable(gl.BLEND);
};

