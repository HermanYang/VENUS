function main() {
	VENUS.Engine.getInstance().getResourceManager().loadResources(goOn);
}

function goOn() {
	VENUS.Engine.getInstance().attachContainer(document.body);

	initScene();

	addEventListeners();

	render();
}

function initScene() {
	var sceneManager = VENUS.Engine.getInstance().getSceneManager();
	scene = sceneManager.createScene("basic");

	//create camera scene node
	cameraNode = scene.createPerspectiveCameraSceneNode(45, 0.01, 1000);
	scene.setCurrentCameraNode(cameraNode);

	for (var i = 0; i < 100; i++) {
		var cubeNode = createCubeScnenNode("cube", 3 * Math.random());
		cubeNode.translate(50 * Math.random(), new VENUS.Vector3(Math.random(), Math.random(), Math.random()));
		scene.getRootSceneNode().addChild(cubeNode);
	}

	var node = scene.createEntitySceneNode("model");
	var material = node.getSceneObject().getMaterial();
	node.getSceneObject().setMesh(VENUS.Mesh.createMeshFromModel("/models/objs/ch_t.obj"));
	var texture = new VENUS.Texture();
	image = VENUS.Engine.getInstance().getResourceManager().getImageByPath("/images/crate.gif");
	texture.createTexture(image);
	material.addTexture(texture);

	cameraNode.addChild(node);
	node.translate(-15, new VENUS.Vector3(0,0,1));
	node.setScale(new VENUS.Vector3(0.3, 0.3, 0.3));

}

function createCubeScnenNode(name, size) {
	// create entity scenen node and initialize it with cube
	var cubeNode = scene.createEntitySceneNode(name);

	var cubeMaterial = cubeNode.getSceneObject().getMaterial();

	cubeNode.getSceneObject().setMesh(VENUS.Mesh.createCubeMesh(size));

	var cubeTexture = new VENUS.Texture();
	image = VENUS.Engine.getInstance().getResourceManager().getImageByPath("/images/crate.gif");
	cubeTexture.createTexture(image);

	cubeMaterial.addTexture(cubeTexture);

	return cubeNode;
}

function initLights() {
	var ambientLight = new VENUS.AmbientLight(new VENUS.Vector3(1, 1, 1));
	ambientLightNode = new VENUS.LightSceneNode(ambientLight);

	var diffuseLight = new VENUS.DiffuseLight(new VENUS.Vector3(1, 1, 1), new VENUS.Vector3(1, - 5, 4));
	diffuseLightNode = new VENUS.LightSceneNode(diffuseLight);
}

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

function render() {
	requestAnimationFrame(render);

	scene.renderScene();
}

