function main() {
	VENUS.Engine.getInstance().getResourceManager().loadResources(goOn);
}

function goOn() {
	VENUS.Engine.getInstance().attachContainer(document.body);

	initScene();

	addEventListeners();

	VENUS.Engine.getInstance().run();
}

function initScene() {
	var sceneManager = VENUS.Engine.getInstance().getSceneManager();
	var scene = sceneManager.createScene("basic");
	sceneManager.setCurrentScene(scene);

	//create camera scene node
	cameraNode = scene.createPerspectiveCameraSceneNode(45, 0.01, 1000);
	scene.setCurrentCameraNode(cameraNode);

	// add a cube 
	var cubeNode = createCubeScnenNode("cube", 5);
	cubeNode.translate(50 * Math.random(), new VENUS.Vector3(Math.random(), Math.random(), Math.random()));
	scene.getRootSceneNode().addChild(cubeNode);

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

	var position = new VENUS.Vector3(-0, 0, 10);
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

function createSphereSceneNode(name , radius){
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

function addEventListeners() {
	document.addEventListener("keydown", onKeyDown, false);
}

function onKeyDown(event) {
	if (event.keyCode == VENUS.KeyCode.UpArrow) {
		//	cubeNodeParent.translate(1, new VENUS.Vector3(0, 0, - 1));
		cameraNode.translate(1, new VENUS.Vector3(0, 0, - 1));
	}
	else if (event.keyCode == VENUS.KeyCode.DownArrow) {
		//cubeNodeParent.translate(1, new VENUS.Vector3(0, 0, 1));
		cameraNode.translate(1, new VENUS.Vector3(0, 0, 1));
	}
	else if (event.keyCode == VENUS.KeyCode.LeftArrow) {
		// cubeNodeParent.translate(1, new VENUS.Vector3( - 1, 0, 0));
		cameraNode.translate(1, new VENUS.Vector3( - 1, 0, 0));
	}
	else if (event.keyCode == VENUS.KeyCode.RightArrow) {
		// cubeNodeParent.translate(1, new VENUS.Vector3(1, 0, 0));
		cameraNode.translate(1, new VENUS.Vector3(1, 0, 0));
	}
}
