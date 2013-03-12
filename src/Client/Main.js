function webGLStart() {
	glMatrix.setMatrixArrayType(VENUS.FLOAT_ARRAY_TYPE);
	canvas = document.getElementById("webgl-canvas");

	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;

	VENUS.ResourceManager.getInstance().loadResources(goOn);
	setTimeout(goOn, 2000);

}

function  goOn() {
	initCamera();

	initCubes();

	initLights();

	addSceneNodes();

	addEventListeners();

	WebGLRenderer = new VENUS.WebGLRenderer(canvas);

	render();

}

function initLights() {
	var ambientLight = new VENUS.AmbientLight(new VENUS.Vector3(1, 1, 1));
	ambientLightNode = new VENUS.LightSceneNode(ambientLight);

	var diffuseLight = new VENUS.DiffuseLight(new VENUS.Vector3(1, 1, 1), new VENUS.Vector3(1, - 5, 4));
	diffuseLightNode = new VENUS.LightSceneNode(diffuseLight);
}

function initCamera() {
	camera = new VENUS.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 100.0);
	cameraNode = new VENUS.CameraSceneNode(camera);

}

function addSceneNodes() {
	cubeNodeParent.translate(15, new VENUS.Vector3(0, 0, - 1));
	cubeNodeChild.translate(15, new VENUS.Vector3(0, 0, - 1));

	cubeNodeParent.rotate(45, new VENUS.Vector3(0, 0, - 1));
	cubeNodeChild.rotate(45, new VENUS.Vector3(0, 0, - 1));

	cubeNodeChild.setScale(new VENUS.Vector3(1, 2, 3));

	sceneManager.rootSceneNode.addChild(cubeNodeParent);
	sceneManager.rootSceneNode.addChild(cameraNode);
	sceneManager.rootSceneNode.addChild(ambientLightNode);
	sceneManager.rootSceneNode.addChild(diffuseLightNode);

	cubeNodeParent.addChild(cubeNodeChild);
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

function initCubes() {
	var cubeMesh = new VENUS.CubeMesh(1);

	var cubeColors = [
	new VENUS.Vector4(1.0, 0.0, 0.0, 1.0), // front face
	new VENUS.Vector4(1.0, 0.0, 0.0, 1.0), // front face
	new VENUS.Vector4(1.0, 0.0, 0.0, 1.0), // front face
	new VENUS.Vector4(1.0, 0.0, 0.0, 1.0), // front face
	new VENUS.Vector4(1.0, 1.0, 0.0, 1.0), // back face
	new VENUS.Vector4(1.0, 1.0, 0.0, 1.0), // back face
	new VENUS.Vector4(1.0, 1.0, 0.0, 1.0), // back face
	new VENUS.Vector4(1.0, 1.0, 0.0, 1.0), // back face
	new VENUS.Vector4(0.0, 1.0, 0.0, 1.0), // top face
	new VENUS.Vector4(0.0, 1.0, 0.0, 1.0), // top face
	new VENUS.Vector4(0.0, 1.0, 0.0, 1.0), // top face
	new VENUS.Vector4(0.0, 1.0, 0.0, 1.0), // top face
	new VENUS.Vector4(1.0, 0.5, 0.5, 1.0), // bottom face
	new VENUS.Vector4(1.0, 0.5, 0.5, 1.0), // bottom face
	new VENUS.Vector4(1.0, 0.5, 0.5, 1.0), // bottom face
	new VENUS.Vector4(1.0, 0.5, 0.5, 1.0), // bottom face
	new VENUS.Vector4(1.0, 0.0, 1.0, 1.0), // right face
	new VENUS.Vector4(1.0, 0.0, 1.0, 1.0), // right face
	new VENUS.Vector4(1.0, 0.0, 1.0, 1.0), // right face
	new VENUS.Vector4(1.0, 0.0, 1.0, 1.0), // right face
	new VENUS.Vector4(0.0, 0.0, 1.0, 1.0), // left face
	new VENUS.Vector4(0.0, 0.0, 1.0, 1.0), // left face
	new VENUS.Vector4(0.0, 0.0, 1.0, 1.0), // left face
	new VENUS.Vector4(0.0, 0.0, 1.0, 1.0) // left face
	];

	var cubeMaterial = new VENUS.Material(cubeColors);

	var cubeTexture = new VENUS.Texture(VENUS.ResourceManager.getInstance().getImageByPath("./Images/crate.gif"));
	cubeMaterial.addTexture(cubeTexture);

	var cubeEntity = new VENUS.Entity(cubeMesh, cubeMaterial);

	sceneManager = new VENUS.SceneManager();

	cubeNodeParent = new VENUS.EntitySceneNode(cubeEntity);

	cubeNodeChild = new VENUS.EntitySceneNode(cubeEntity);
}

function render() {
	requestAnimationFrame(render);
	WebGLRenderer.renderScene(sceneManager, cameraNode);
}

