function main() {
	VENUS.Engine.getInstance().getResourceManager().loadResources(goOn);
}

function goOn() {
	VENUS.Engine.getInstance().attachContainer(document.body);
	VENUS.Engine.getInstance().setFullScreen(true);

	initScene();

	VENUS.Engine.getInstance().run();
}

function initScene() {
	var sceneManager = VENUS.Engine.getInstance().getSceneManager();
	var scene = sceneManager.createScene("basic");
	var webglConst = VENUS.Engine.getWebGLConstants();
	sceneManager.setCurrentScene(scene);

	//create camera scene node
	cameraNode = scene.createFPSCameraSceneNode(45, 0.01, 5000, new VENUS.Vector3(0, 0, 0), new VENUS.Vector3(0, 0, - 1), new VENUS.Vector3(0, 1, 0));
	scene.setCurrentCameraNode(cameraNode);

	var resManager = VENUS.Engine.getInstance().getResourceManager();
	var px = resManager.getImageByPath("/images/skybox/px.jpg");
	var nx = resManager.getImageByPath("/images/skybox/nx.jpg");
	var py = resManager.getImageByPath("/images/skybox/py.jpg");
	var ny = resManager.getImageByPath("/images/skybox/ny.jpg");
	var pz = resManager.getImageByPath("/images/skybox/pz.jpg");
	var nz = resManager.getImageByPath("/images/skybox/nz.jpg");

	//add a cube 
	//for(var i = 0; i < 400; ++i){
		//var cubeNode = createCubeScnenNode("cube", 5);
		//cubeNode.setPosition(new VENUS.Vector3(100 * VENUS.Math.random(-1, 1), 150 *  VENUS.Math.random(-1, 1), 150 * VENUS.Math.random(-1, 1)));
		//scene.getRootSceneNode().addChild(cubeNode);
	//}

	//add a model
	//var node = scene.createEntitySceneNode("model");
	//var material = node.getSceneObject().getMaterial();
	//node.getSceneObject().setMesh(VENUS.Mesh.createMeshFromModel("/models/objs/macbook.obj"));
	//var texture = new VENUS.Texture();
	//var image = VENUS.Engine.getInstance().getResourceManager().getImageByPath("/images/ghxp.png");
	//texture.createTexture(webglConst.TEXTURE_2D, webglConst.RGBA, webglConst.RGBA, webglConst.UNSIGNED_BYTE, image);
	//material.set2DTexture(texture);
	//scene.getRootSceneNode().addChild(node);

	/*for (var i = 0; i < 400; ++i) {
		//add a sphere
		var sphereNode = createSphereSceneNode("sphere", 10);
		sphereNode.setPosition(new VENUS.Vector3(100 * VENUS.Math.random(-1, 1), 150 *  VENUS.Math.random(-1, 1), 150 * VENUS.Math.random(-1, 1)));
		scene.getRootSceneNode().addChild(sphereNode);
	}*/

	// add lights
	// direction light
	//var directionLightAmbientColor = new VENUS.Vector3(0.0, 0.0, 0.0);
	//var directionLightDiffuseColor = new VENUS.Vector3(1.0, 1.0, 1.0);
	//var directionLightSpecularColor = new VENUS.Vector3(1.0, 0.0, 0.0);

	//var direction = new VENUS.Vector3(0, 0, -1);
	//var directionLightNode = scene.createDirectionLightSceneNode(directionLightAmbientColor, directionLightDiffuseColor, directionLightSpecularColor, direction);
	//scene.getRootSceneNode().addChild(directionLightNode);

	// point lights
	var pointLightAmbientColor = new VENUS.Vector3(0.5, 0.5, 0.5);
	var pointLightDiffuseColor = new VENUS.Vector3(1.0, 1.0, 1.0);
	var pointLightSpecularColor = new VENUS.Vector3(1.0, 1.0, 1.0);

	var position = new VENUS.Vector3(0, -5, 2);
	var pointLightNode = scene.createPointLightSceneNode(pointLightAmbientColor, pointLightDiffuseColor, pointLightSpecularColor, position);
	scene.getRootSceneNode().addChild(pointLightNode);
	
	// spot lights
	//var spotLightAmbientColor = new VENUS.Vector3(0.1, 0.1, 0.1);
	//var spotLightDiffuseColor = new VENUS.Vector3(0.0, 1.0, 0.0);
	//var spotLightSpecularColor = new VENUS.Vector3(1.0, 0.0, 0.0);

	//var spotDirection = new VENUS.Vector3(0.0, 0.0, -1);
	//var spotLightPosition = new VENUS.Vector3(0, 0, 200);
	//var spotDegree = 5;
	//var spotLightNode = scene.createSpotLightSceneNode(spotLightAmbientColor, spotLightDiffuseColor, spotLightSpecularColor, spotDirection, spotLightPosition, spotDegree );
	//scene.getRootSceneNode().addChild(spotLightNode);

	//create particles
	var image = VENUS.Engine.getInstance().getResourceManager().getImageByPath("/images/spark.png");
	var particleNode = scene.createParticleEmmiterSceneNode(image);
	scene.getRootSceneNode().addChild(particleNode);

	// create billboard
	//var image = VENUS.Engine.getInstance().getResourceManager().getImageByPath("/images/spark.png");
	//var billboardNode = scene.createBillboardSceneNode(1, 1, image);
	//var billboard = billboardNode.getSceneObject();
	//var material = billboard.getMaterial();
	//material.setTransparent(true);
	//scene.getRootSceneNode().addChild(billboardNode);
	
	var skyboxNode = scene.createSkyBoxSceneNode("skybox", 2000, px, nx, py, ny, pz, nz);
	scene.getRootSceneNode().addChild(skyboxNode);
	document.body.webkitRequestPointerLock();
}

function createCubeScnenNode(name, size) {
	// create entity scenen node and initialize it with cube
	var sceneManager = VENUS.Engine.getInstance().getSceneManager();
	var scene = sceneManager.getCurrentScene();
	var webglConst = VENUS.Engine.getWebGLConstants();

	var cubeNode = scene.createEntitySceneNode(name);

	var cubeMaterial = cubeNode.getSceneObject().getMaterial();
	cubeMaterial.setTransparent(true);
	cubeMaterial.setAlpha(0.8);

	cubeNode.getSceneObject().setMesh(VENUS.Mesh.createCubeMesh(size));

	var cubeTexture = new VENUS.Texture();
	var image = VENUS.Engine.getInstance().getResourceManager().getImageByPath("/images/crate.gif");

	cubeTexture.createTexture(webglConst.TEXTURE_2D, webglConst.RGBA, webglConst.RGBA, webglConst.UNSIGNED_BYTE, image);

	cubeMaterial.set2DTexture(cubeTexture);

	return cubeNode;
}

function createSphereSceneNode(name, radius) {
	// create entity scenen node and initialize it with cube
	var sceneManager = VENUS.Engine.getInstance().getSceneManager();
	var scene = sceneManager.getCurrentScene();
	var webglConst = VENUS.Engine.getWebGLConstants();

	var node = scene.createEntitySceneNode(name);

	var material = node.getSceneObject().getMaterial();
	//material.setTransparent(true);
	material.setAlpha(0.5);
	node.getSceneObject().setMesh(VENUS.Mesh.createSphereMesh(radius, 30, 30));

	var texture = new VENUS.Texture();
	image = VENUS.Engine.getInstance().getResourceManager().getImageByPath("/images/ghxp.png");
	texture.createTexture(webglConst.TEXTURE_2D, webglConst.RGBA, webglConst.RGBA, webglConst.UNSIGNED_BYTE, image);

	material.set2DTexture(texture);

	return node;
};

