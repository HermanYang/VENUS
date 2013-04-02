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
	sceneManager.setCurrentScene(scene);

	//create camera scene node
	cameraNode = scene.createFPSCameraSceneNode(45, 0.01, 1000);
	scene.setCurrentCameraNode(cameraNode);

	// add a cube 
	var cubeNode = createCubeScnenNode("cube", 5);
	scene.getRootSceneNode().addChild(cubeNode);
	var straightForwardAnimation = new VENUS.StraightForwardAnimation();
	straightForwardAnimation.setDuration(10000);
	straightForwardAnimation.setSpeed(0.11);
	straightForwardAnimation.setDirection(new VENUS.Vector3(0, 0, -1));
	cubeNode.addAnimation(straightForwardAnimation);
	cubeNode.startAnimation();
	
	// add a model
	/*var node = scene.createEntitySceneNode("model");
	var material = node.getSceneObject().getMaterial();
	node.getSceneObject().setMesh(VENUS.Mesh.createMeshFromModel("/models/objs/macbook.obj"));
	var texture = new VENUS.Texture();
	var image = VENUS.Engine.getInstance().getResourceManager().getImageByPath("/images/crate.gif");
	texture.createTexture(image);
	material.addTexture(texture);
	scene.getRootSceneNode().addChild(node);*/

	// add a sphere
	var sphereNode = createSphereSceneNode("sphere", 3);
	sphereNode.translate(50 * Math.random(), new VENUS.Vector3(Math.random(), 0, Math.random()));
	scene.getRootSceneNode().addChild(sphereNode);

	// add lights
	/*var directionLightAmbientColor = new VENUS.Vector3(1.1, 1.1, 1.1);
	var directionLightDiffuseColor = new VENUS.Vector3(0.0, 0.0, 0.0);
	var directionLightSpecularColor = new VENUS.Vector3(0.0, 0.0, 0.0);

	var direction = new VENUS.Vector3(0, -0, -1);
	var directionLightNode = scene.createDirectionLightSceneNode(directionLightAmbientColor, directionLightDiffuseColor, directionLightSpecularColor, direction);
	scene.getRootSceneNode().addChild(directionLightNode);*/

	var pointLightAmbientColor = new VENUS.Vector3(0.1, 0.1, 0.1);
	var pointLightDiffuseColor = new VENUS.Vector3(0.5, 0.5, 0.5);
	var pointLightSpecularColor = new VENUS.Vector3(0.5, 0.5, 0.5);

	var position = new VENUS.Vector3( - 0, 0, 10);
	var pointLightNode = scene.createPointLightSceneNode(pointLightAmbientColor, pointLightDiffuseColor, pointLightSpecularColor, position);
	scene.getRootSceneNode().addChild(pointLightNode);

	/*var spotLightAmbientColor = new VENUS.Vector3(0.1, 0.1, 0.1);
	var spotLightDiffuseColor = new VENUS.Vector3(0.0, 1.0, 0.0);
	var spotLightSpecularColor = new VENUS.Vector3(0.0, 0.0, 1.0);

	var spotDirection = new VENUS.Vector3(0.1, 0.1, 1);
	var spotLightPosition = new VENUS.Vector3(0, 0, -10);
	var spotDegree = 10;
	var spotLightNode = scene.createSpotLightSceneNode(spotLightAmbientColor, spotLightDiffuseColor, spotLightSpecularColor, spotDirection, spotLightPosition, spotDegree );
	scene.getRootSceneNode().addChild(spotLightNode);*/
}

function createCubeScnenNode(name, size) {
	// create entity scenen node and initialize it with cube
	var sceneManager = VENUS.Engine.getInstance().getSceneManager();
	var scene = sceneManager.getCurrentScene();

	var cubeNode = scene.createEntitySceneNode(name);

	var cubeMaterial = cubeNode.getSceneObject().getMaterial();

	cubeNode.getSceneObject().setMesh(VENUS.Mesh.createCubeMesh(size));

	var cubeTexture = new VENUS.Texture();
	image = VENUS.Engine.getInstance().getResourceManager().getImageByPath("/images/ghxp.png");
	cubeTexture.createTexture(image);

	cubeMaterial.addTexture(cubeTexture);

	return cubeNode;
}

function createSphereSceneNode(name, radius) {
	// create entity scenen node and initialize it with cube
	var sceneManager = VENUS.Engine.getInstance().getSceneManager();
	var scene = sceneManager.getCurrentScene();

	var node = scene.createEntitySceneNode(name);

	var material = node.getSceneObject().getMaterial();

	node.getSceneObject().setMesh(VENUS.Mesh.createSphereMesh(radius, 30, 30));

	var texture = new VENUS.Texture();
	image = VENUS.Engine.getInstance().getResourceManager().getImageByPath("/images/moon.gif");
	texture.createTexture(image);

	material.addTexture(texture);

	return node;
};
