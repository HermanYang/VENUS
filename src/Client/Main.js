function webGLStart() {
	VENUS.Engine.getInstance().getResourceManager().loadResources(goOn);
}

function goOn() {
	container = document.createElement("div");
	container.style.height = "500";
	container.style.width = "500";
	document.body.appendChild(container);
	container.appendChild(VENUS.Engine.getInstance().getCanvas());
	container.appendChild(VENUS.Engine.getInstance().getCanvas()).width = 500;
	container.appendChild(VENUS.Engine.getInstance().getCanvas()).height = 500;
	var gl = VENUS.Engine.getInstance().getContext();
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);
	VENUS.Engine.getInstance().getRenderer().setSize(500, 500);
	initCamera();

	initCubes();

	initLights();

	addSceneNodes();

	addEventListeners();

	render();
}

function initLights() {
	var ambientLight = new VENUS.AmbientLight(new VENUS.Vector3(1, 1, 1));
	ambientLightNode = new VENUS.LightSceneNode(ambientLight);

	var diffuseLight = new VENUS.DiffuseLight(new VENUS.Vector3(1, 1, 1), new VENUS.Vector3(1, - 5, 4));
	diffuseLightNode = new VENUS.LightSceneNode(diffuseLight);
}

function initCamera() {
	var canvas = VENUS.Engine.getInstance().getCanvas();
	var factor = canvas.width / canvas.height;
	camera = new VENUS.PerspectiveCamera(45, factor, 0.1, 100.0);
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

	var cubeTexture = new VENUS.Texture(VENUS.Engine.getInstance().getResourceManager().getImageByPath("./Images/crate.gif"));
	cubeMaterial.addTexture(cubeTexture);

	cubeEntity = new VENUS.Entity(cubeMesh, cubeMaterial);

	sceneManager = new VENUS.SceneManager();

	cubeNodeParent = new VENUS.EntitySceneNode(cubeEntity);

	cubeNodeChild = new VENUS.EntitySceneNode(cubeEntity);
}

function render() {
	requestAnimationFrame(render);
	var gl = VENUS.Engine.getInstance().getContext();
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	var viewMatrix = new VENUS.Matrix44(cameraNode.getViewMatrix());

	var projectMatrix = camera.getProjectMatrix();

	cubeNodeParent.render(projectMatrix, viewMatrix);
}

