function main() {
	VENUS.Engine.getInstance().getResourceManager().loadResources(goOn);
}

function goOn() {
	VENUS.Engine.getInstance().attachContainer(document.body);

	initScene();

	VENUS.Engine.getInstance().run();
}

function initScene() {
	var sceneManager = VENUS.Engine.getInstance().getSceneManager();
	var scene = sceneManager.createScene("basic");
	var webglConst = VENUS.Engine.getWebGLConstants();
	sceneManager.setCurrentScene(scene);

	//create camera scene node
	cameraNode = scene.createFPSCameraSceneNode(45, 0.01, 1000);
	scene.setCurrentCameraNode(cameraNode);

	//add a cube 
	/*var cubeNode = createCubeScnenNode("cube", 5);
	scene.getRootSceneNode().addChild(cubeNode);*/

	var resManager = VENUS.Engine.getInstance().getResourceManager();
	var px = resManager.getImageByPath("/images/skybox/px.jpg");
	var nx = resManager.getImageByPath("/images/skybox/nx.jpg");
	var py = resManager.getImageByPath("/images/skybox/py.jpg");
	var ny = resManager.getImageByPath("/images/skybox/ny.jpg");
	var pz = resManager.getImageByPath("/images/skybox/pz.jpg");
	var nz = resManager.getImageByPath("/images/skybox/nz.jpg");

	// add a model
	/*var node = scene.createEntitySceneNode("model");
	var material = node.getSceneObject().getMaterial();
	node.getSceneObject().setMesh(VENUS.Mesh.createMeshFromModel("/models/objs/macbook.obj"));
	var texture = new VENUS.Texture();
	var image = VENUS.Engine.getInstance().getResourceManager().getImageByPath("/images/ghxp.png");
	texture.createTexture(webglConst.TEXTURE_2D, webglConst.RGBA, webglConst.RGBA, webglConst.UNSIGNED_BYTE, image); 
	material.set2DTexture(texture);
	scene.getRootSceneNode().addChild(node);
*/
	// add a sphere
	var sphereNode = createSphereSceneNode("sphere", 3);
	sphereNode.translate(20 * Math.random(), new VENUS.Vector3(Math.random(), 0, Math.random()));
	scene.getRootSceneNode().addChild(sphereNode);

	var skyboxNode = scene.createSkyBoxSceneNode("skybox", 500, px, nx, py, ny, pz, nz);
	scene.getRootSceneNode().addChild(skyboxNode);

	// add lights
	// direction light
	/*var directionLightAmbientColor = new VENUS.Vector3(1.1, 1.1, 1.1);
	var directionLightDiffuseColor = new VENUS.Vector3(0.0, 0.0, 0.0);
	var directionLightSpecularColor = new VENUS.Vector3(0.0, 0.0, 0.0);

	var direction = new VENUS.Vector3(0, -0, -1);
	var directionLightNode = scene.createDirectionLightSceneNode(directionLightAmbientColor, directionLightDiffuseColor, directionLightSpecularColor, direction);
	scene.getRootSceneNode().addChild(directionLightNode);*/

	// point lights
	var pointLightAmbientColor = new VENUS.Vector3(0.4, 0.4, 0.4);
	var pointLightDiffuseColor = new VENUS.Vector3(0.8, 0.8, 0.8);
	var pointLightSpecularColor = new VENUS.Vector3(0.1, 0.1, 0.1);

	var position = new VENUS.Vector3(0, 0, 0);
	var pointLightNode = scene.createPointLightSceneNode(pointLightAmbientColor, pointLightDiffuseColor, pointLightSpecularColor, position);
	scene.getRootSceneNode().addChild(pointLightNode);

	// spot lights
	/*var spotLightAmbientColor = new VENUS.Vector3(0.1, 0.1, 0.1);
	var spotLightDiffuseColor = new VENUS.Vector3(0.0, 1.0, 0.0);
	var spotLightSpecularColor = new VENUS.Vector3(0.0, 0.0, 1.0);

	var spotDirection = new VENUS.Vector3(0.1, 0.1, 1);
	var spotLightPosition = new VENUS.Vector3(0, 0, -10);
	var spotDegree = 10;
	var spotLightNode = scene.createSpotLightSceneNode(spotLightAmbientColor, spotLightDiffuseColor, spotLightSpecularColor, spotDirection, spotLightPosition, spotDegree );
	scene.getRootSceneNode().addChild(spotLightNode);*/

	// create particles
	/*var image = VENUS.Engine.getInstance().getResourceManager().getImageByPath("/images/spark.png");
	var particleNode = scene.createParticleEmmiterSceneNode(image);
	scene.getRootSceneNode().addChild(particleNode);*/

	var image = VENUS.Engine.getInstance().getResourceManager().getImageByPath("/images/ghxp.png");
	var billboardNode = scene.createBillboardSceneNode(10, 10, image);
	scene.getRootSceneNode().addChild(billboardNode);
}

function createCubeScnenNode(name, size) {
	// create entity scenen node and initialize it with cube
	var sceneManager = VENUS.Engine.getInstance().getSceneManager();
	var scene = sceneManager.getCurrentScene();
	var webglConst = VENUS.Engine.getWebGLConstants();

	var cubeNode = scene.createEntitySceneNode(name);

	var cubeMaterial = cubeNode.getSceneObject().getMaterial();

	cubeNode.getSceneObject().setMesh(VENUS.Mesh.createCubeMesh(size));

	var cubeTexture = new VENUS.Texture();
	var image = VENUS.Engine.getInstance().getResourceManager().getImageByPath("/images/ghxp.png");

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

	node.getSceneObject().setMesh(VENUS.Mesh.createSphereMesh(radius, 30, 30));

	var texture = new VENUS.Texture();
	image = VENUS.Engine.getInstance().getResourceManager().getImageByPath("/images/moon.gif");
	texture.createTexture(webglConst.TEXTURE_2D, webglConst.RGBA, webglConst.RGBA, webglConst.UNSIGNED_BYTE, image);

	material.set2DTexture(texture);

	return node;
};

