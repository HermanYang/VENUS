/*
 *special renderer to render Entity
 */
VENUS.WebGLEntityRenderer = function(entity) {
	VENUS.WebGLRenderer.call(this, entity);

	this._context = VENUS.Engine.getInstance().getWebGLConfiguration().getContext();
	this._program = VENUS.Engine.getInstance().getResourceManager().getDefaultProgram();

	this._vertexBuffer = new VENUS.ArrayBuffer();
	this._indexBuffer = new VENUS.ArrayBuffer();
	this._normalBuffer = new VENUS.ArrayBuffer();
	this._colorBuffer = new VENUS.ArrayBuffer();
	this._textureCoordBuffer = new VENUS.ArrayBuffer();
};

VENUS.WebGLEntityRenderer.prototype = Object.create(VENUS.WebGLRenderer);

VENUS.WebGLEntityRenderer.prototype._updateBuffers = function() {
	var gl = this._context;
	var entity = this._renderableObject;
	var material = entity.getMaterial();
	var mesh = entity.getMesh();

	var vectorDimension = 0;
	var vertices = mesh.getVertices();
	var indices = mesh.getIndices();
	var normals = mesh.getNormals();
	var textureCoords = mesh.getTextureCoords();

	var colors = entity._material.getColors();

	var verticesChanged = mesh.verticesChanged;
	var indicesChanged = mesh.indicesChanged;
	var normalsChanged = mesh.normalsChanged;
	var textureCoordsChanged = mesh.textureCoordsChanged;
	var colorsChanged = material.colorsChanged;

	var webglConst = VENUS.Engine.getWebGLConstants();

	if (verticesChanged) {
		vectorDimension = 3;
		this._vertexBuffer.createBuffer(vertices, vectorDimension, webglConst.ARRAY_BUFFER, VENUS.FLOAT_ARRAY, webglConst.STATIC_DRAW);
		entity._mesh.verticesChanged = false;
	}

	if (indicesChanged) {
		vectorDimension = 1;
		this._indexBuffer.createBuffer(indices, vectorDimension, webglConst.ELEMENT_ARRAY_BUFFER, VENUS.UNSIGNED_INT_ARRAY, webglConst.STATIC_DRAW);
		entity._mesh.indicesChanged = false;
	}

	if (normalsChanged) {
		vectorDimension = 3;
		this._normalBuffer.createBuffer(normals, vectorDimension, webglConst.ARRAY_BUFFER, VENUS.FLOAT_ARRAY, webglConst.STATIC_DRAW);
		entity._mesh.normalsChanged = false;
	}

	if (textureCoordsChanged) {
		vectorDimension = 2;
		this._textureCoordBuffer.createBuffer(textureCoords, vectorDimension, webglConst.ARRAY_BUFFER, VENUS.FLOAT_ARRAY, webglConst.STATIC_DRAW);
		entity._mesh.textureCoordsChanged = false;
	}

	if (colorsChanged) {
		vectorDimension = 4;
		this._colorBuffer.createBuffer(colors, vectorDimension, webglConst.ARRAY_BUFFER, VENUS.FLOAT_ARRAY, webglConst.STATIC_DRAW);
		entity._material.colorsChanged = false;
	}
};

/*
 *Do shader program initialization according to the material and other infomations
 */
VENUS.WebGLEntityRenderer.prototype._setupShaderProgram = function(projectionMatrix, viewMatrix, modelMatrix) {

	var program = this._program;
	var entity = this._renderableObject;
	var material = entity.getMaterial();
	var mesh = entity.getMesh();
	var shiniess = material.getShininess();
	var modelViewMatrix = new VENUS.Matrix44(viewMatrix);
	modelViewMatrix.multiply(modelMatrix);

	var normalMatrix = new VENUS.Matrix44(modelViewMatrix);
	normalMatrix.invert();
	normalMatrix.transpose();

	this._setupTextures();

	this._setupLights();

	program.setUniformMatrix44("uViewMatrix", viewMatrix);
	program.setUniformMatrix44("uModelViewMatrix", modelViewMatrix);
	program.setUniformMatrix44("uProjectionMatrix", projectionMatrix);
	program.setUniformMatrix44("uNormalMatrix", normalMatrix);

	program.setUniformFloat("uMaterialShininess", shiniess);

	this._vertexBuffer.bindDefaultProgramAttribute("aVertex", 0, 0);
	this._normalBuffer.bindDefaultProgramAttribute("aNormal", 0, 0);
	this._textureCoordBuffer.bindDefaultProgramAttribute("aTextureCoord", 0, 0);
};

VENUS.WebGLEntityRenderer.prototype.render = function(projectionMatrix, viewMatrix, modelMatrix) {

	var gl = this._context;
	var cons = VENUS.Engine.getWebGLConstants();
	var entity = this._renderableObject;

	this._updateBuffers();

	this._setupShaderProgram(projectionMatrix, viewMatrix, modelMatrix);

	this._indexBuffer.drawElements(cons.TRIANGLES);
};

VENUS.WebGLEntityRenderer.prototype._setupTextures = function() {
	var webglConst = VENUS.Engine.getWebGLConstants();
	var program = this._program;
	var entity = this._renderableObject;
	var material = entity.getMaterial();
	var texture2D = material.get2DTexture();
	var textureCubeMap = material.getCubeMapTexture();

	var TEXTURE_2D = 0;
	var TEXTURE_CUBE_MAP = 1;

	if (texture2D !== null) {
		program.setTexture("u2DTextureSampler", texture2D, webglConst.LINEAR, webglConst.LINEAR, webglConst.CLAMP_TO_EDGE, webglConst.CLAMP_TO_EDGE);
		program.setUniformInt("uTextureMode", TEXTURE_2D);
	}
	else if (textureCubeMap !== null) {
		program.setTexture("uCubeTextureSampler", textureCubeMap, webglConst.LINEAR, webglConst.LINEAR, webglConst.CLAMP_TO_EDGE, webglConst.CLAMP_TO_EDGE);
		program.setUniformInt("uTextureMode", TEXTURE_CUBE_MAP);
	}

};

VENUS.WebGLEntityRenderer.prototype._setupLights = function() {
	var currentScene = VENUS.Engine.getInstance().getSceneManager().getCurrentScene();
	var lights = currentScene.getLights();
	var directionLightNodes = lights["directionLights"];
	var pointLightNodes = lights["pointLights"];
	var spotLightNodes = lights["spotLights"];

	this._setupDirectionLights(directionLightNodes);

	this._setupPointLights(pointLightNodes);

	this._setupSpotLights(spotLightNodes);
};

VENUS.WebGLEntityRenderer.prototype._setupDirectionLights = function(directionLightNodes) {
	var program = this._program;
	var directions = [];
	var availableList = [];
	var ambientColors = [];
	var diffuseColors = [];
	var specularColors = [];

	if (directionLightNodes.length > 0) {
		for (var i = 0; i < VENUS.MAX_DIRECTION_LIGHT_AMOUNT; ++i) {
			if (i < directionLightNodes.length) {
				var directionLight = directionLightNodes[i].getSceneObject();
				directions.push(directionLight.getDirection());
				ambientColors.push(directionLight.getAmbientLightColor());
				diffuseColors.push(directionLight.getDiffuseLightColor());
				specularColors.push(directionLight.getSpecularLightColor());
				availableList.push(1);
			}
			else {
				availableList.push(0);
			}
		}
		program.setUniformVector3Array("uDirectionLightDirections", directions);
		program.setUniformVector3Array("uDirectionLightAmbientColors", ambientColors);
		program.setUniformVector3Array("uDirectionLightDiffuseColors", diffuseColors);
		program.setUniformVector3Array("uDirectionLightSpecularColors", specularColors);
		program.setUniformIntArray("uDirectionLightAvailableList", availableList);
	}

};

VENUS.WebGLEntityRenderer.prototype._setupPointLights = function(pointLightNodes) {
	var program = this._program;
	var positions = [];
	var availableList = [];
	var ambientColors = [];
	var diffuseColors = [];
	var specularColors = [];

	if (pointLightNodes.length > 0) {
		for (var i = 0; i < VENUS.MAX_POINT_LIGHT_AMOUNT; ++i) {
			if (i < pointLightNodes.length) {
				var pointLight = pointLightNodes[i].getSceneObject();
				positions.push(pointLightNodes[i].getPosition());
				ambientColors.push(pointLight.getAmbientLightColor());
				diffuseColors.push(pointLight.getDiffuseLightColor());
				specularColors.push(pointLight.getSpecularLightColor());
				availableList.push(1);
			}
			else {
				availableList.push(0);
			}
		}

		program.setUniformVector3Array("uPointLightPositions", positions);
		program.setUniformVector3Array("uPointLightAmbientColors", ambientColors);
		program.setUniformVector3Array("uPointLightDiffuseColors", diffuseColors);
		program.setUniformVector3Array("uPointLightSpecularColors", specularColors);
		program.setUniformIntArray("uPointLightAvailableList", availableList);
	}
};

VENUS.WebGLEntityRenderer.prototype._setupSpotLights = function(spotLightNodes) {
	var program = this._program;
	var directions = [];
	var positions = [];
	var cutoffs = [];
	var availableList = [];
	var ambientColors = [];
	var diffuseColors = [];
	var specularColors = [];

	if (spotLightNodes.length > 0) {
		for (var i = 0; i < VENUS.MAX_SPOT_LIGHT_AMOUNT; ++i) {
			if (i < spotLightNodes.length) {
				var spotLight = spotLightNodes[i].getSceneObject();
				directions.push(spotLight.getDirection());
				cutoffs.push(spotLight.getCosCutoff());
				ambientColors.push(spotLight.getAmbientLightColor());
				diffuseColors.push(spotLight.getDiffuseLightColor());
				specularColors.push(spotLight.getSpecularLightColor());
				positions.push(spotLightNodes[i].getPosition());
				availableList.push(1);

			}
			else {
				availableList.push(0);
			}
		}

		program.setUniformVector3Array("uSpotLightDirections", directions);
		program.setUniformVector3Array("uSpotLightAmbientColors", ambientColors);
		program.setUniformVector3Array("uSpotLightDiffuseColors", diffuseColors);
		program.setUniformVector3Array("uSpotLightSpecularColors", specularColors);
		program.setUniformVector3Array("uSpotLightPositions", positions);
		program.setUniformIntArray("uSpotLightAvailableList", availableList);
		program.setUniformFloatArray("uSpotLightCosCutoffs", cutoffs);
	}
};

