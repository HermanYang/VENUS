function main() {
	var engine = VENUS.Engine.getInstance();
	engine.addOnPointerLockChangedHandler(onPointerLockChanged);
	var resManager = engine.getResourceManager();
	resManager.loadResources(onResourceLoaded);

	var uiManager = UIManager.getInstance();
	var loadingPage = uiManager.getLoadingPage();
	loadingPage.setOnStartButtonClickHandler(onDemoStart);
	document.body.appendChild(loadingPage.getContainer());

	loadingPage.startLoading();
};

function onResourceLoaded() {
	var engine = VENUS.Engine.getInstance();

	createUniversityScene();

	var uiManager = UIManager.getInstance();
	var loadingPage = uiManager.getLoadingPage();

	loadingPage.finishLoading();
}

function onDemoStart() {
	var engine = VENUS.Engine.getInstance();
	var uiManager = UIManager.getInstance();
	var loadingPage = uiManager.getLoadingPage();
	var pausingPage = uiManager.getPausingPage();

	pausingPage.setOnResumeButtonClickHandler(onResume);
	document.body.removeChild(loadingPage.getContainer());
	document.body.appendChild(pausingPage.getContainer());
	engine.attachContainer(document.body);

	engine.run();
	engine.pause();
};

function onResume() {
	var engine = VENUS.Engine.getInstance();
	document.body.webkitRequestPointerLock();
};

function onPointerLockChanged() {
	var engine = VENUS.Engine.getInstance();

	if (document.webkitPointerLockElement === document.body) {
		var uiManager = UIManager.getInstance();
		var pausingPage = uiManager.getPausingPage();
		if (document.body.hasChildNodes(pausingPage.getContainer())) {
			document.body.removeChild(pausingPage.getContainer());
			engine.resume();
		}

	}
	else {
		var uiManager = UIManager.getInstance();
		var pausingPage = uiManager.getPausingPage();
		document.body.appendChild(pausingPage.getContainer());
		engine.pause();
	}
};

function createComets() {
	var sceneManager = VENUS.Engine.getInstance().getSceneManager();
	var resManager = VENUS.Engine.getInstance().getResourceManager();

	var scene = sceneManager.getCurrentScene();

	// add particles
	var image = VENUS.Engine.getInstance().getResourceManager().getImageByPath("/images/sun.png");
	var particleNode = scene.createParticleEmmiterSceneNode(image);
	particleNode.setParticleSize(5, 10);
	particleNode.setParticleSpeed(40, 50);
	var straightForwardRepeatAnimation = new VENUS.StraightForwardRepeatAnimation();
	particleNode.addAnimation(straightForwardRepeatAnimation);

	straightForwardRepeatAnimation.setAcceleration(0.01);
	straightForwardRepeatAnimation.setSpeed(0);
	scene.getRootSceneNode().addChild(particleNode);

}

function createBattleShips() {
	var sceneManager = VENUS.Engine.getInstance().getSceneManager();
	var webglConst = VENUS.Engine.getWebGLConstants();
	var resManager = VENUS.Engine.getInstance().getResourceManager();

	var scene = sceneManager.getCurrentScene();
	var currentCameraSceneNode = scene.getCurrentCameraSceneNode();

	var selfBattleShipSceneNode = scene.createEntitySceneNode("self");
	var material = selfBattleShipSceneNode.getSceneObject().getMaterial();
	material.set2DTexture(texture);
	material.setTransparent(true);
	material.setColor(new VENUS.Vector4(1, 1, 1, 0.3));
	var texture = new VENUS.Texture();
	var image = VENUS.Engine.getInstance().getResourceManager().getImageByPath("/images/metal.jpg");

	selfBattleShipSceneNode.getSceneObject().setMesh(VENUS.Mesh.createMeshFromModel("/models/objs/cf1.obj"));

	texture.createTexture(webglConst.TEXTURE_2D, webglConst.RGBA, webglConst.RGBA, webglConst.UNSIGNED_BYTE, image);
	material.set2DTexture(texture);

	selfBattleShipSceneNode.setPosition(new VENUS.Vector3(0, - 5, - 30));
	currentCameraSceneNode.addChild(selfBattleShipSceneNode);

	var battleShipLeaderSceneNode = scene.createEntitySceneNode("leader");
	material = battleShipLeaderSceneNode.getSceneObject().getMaterial();
	battleShipLeaderSceneNode.getSceneObject().setMesh(VENUS.Mesh.createMeshFromModel("/models/objs/cf1.obj"));
	material.set2DTexture(texture);
	material.setTransparent(true);
	material.setColor(new VENUS.Vector4(1, 1, 1, 0.5));
	battleShipLeaderSceneNode.setPosition(new VENUS.Vector3(0, 0, - 200));
	battleShipLeaderSceneNode.setScale(new VENUS.Vector3(2.0, 2.0, 2.0));
	scene.getRootSceneNode().addChild(battleShipLeaderSceneNode);

	var battleShipFollowerASceneNode = scene.createEntitySceneNode("followerA");
	material = battleShipFollowerASceneNode.getSceneObject().getMaterial();
	battleShipFollowerASceneNode.getSceneObject().setMesh(VENUS.Mesh.createMeshFromModel("/models/objs/cf1.obj"));
	material.set2DTexture(texture);
	material.setTransparent(true);
	material.setColor(new VENUS.Vector4(1, 1, 1, 0.3));
	battleShipFollowerASceneNode.setPosition(new VENUS.Vector3(40, 0,  40));
	battleShipLeaderSceneNode.addChild(battleShipFollowerASceneNode);

	var battleShipFollowerBSceneNode= scene.createEntitySceneNode("followerB");
	material = battleShipFollowerBSceneNode.getSceneObject().getMaterial();
	battleShipFollowerBSceneNode.getSceneObject().setMesh(VENUS.Mesh.createMeshFromModel("/models/objs/cf1.obj"));
	material.set2DTexture(texture);
	material.setTransparent(true);
	material.setColor(new VENUS.Vector4(1, 1, 1, 0.3));
	battleShipFollowerBSceneNode.setPosition(new VENUS.Vector3( - 40, 0,  40));
	battleShipLeaderSceneNode.addChild(battleShipFollowerBSceneNode);

	var centripetalAnimation = new VENUS.CentripetalAnimation();
	centripetalAnimation.setSpeed(0.01);
	centripetalAnimation.setAcceleration(0.0001);
	centripetalAnimation.setMaxSpeed(0.3);

	var goAndReturnAnimation = new VENUS.GoAndReturnAnimation();
	goAndReturnAnimation.setSpeed(0.01);
	goAndReturnAnimation.setAcceleration(0.0001);
	goAndReturnAnimation.setMaxSpeed(0.3);

	battleShipLeaderSceneNode.addAnimation(centripetalAnimation);
	battleShipLeaderSceneNode.addAnimation(goAndReturnAnimation);
};

function createPlanets() {
	var sceneManager = VENUS.Engine.getInstance().getSceneManager();
	var webglConst = VENUS.Engine.getWebGLConstants();
	var resManager = VENUS.Engine.getInstance().getResourceManager();

	var scene = sceneManager.getCurrentScene();

	// add moon
	var moonNode = scene.createEntitySceneNode("moon");
	var material = moonNode.getSceneObject().getMaterial();
	moonNode.getSceneObject().setMesh(VENUS.Mesh.createSphereMesh(50, 50, 50));
	var texture = new VENUS.Texture();
	image = VENUS.Engine.getInstance().getResourceManager().getImageByPath("/images/moon.jpg");
	texture.createTexture(webglConst.TEXTURE_2D, webglConst.RGBA, webglConst.RGBA, webglConst.UNSIGNED_BYTE, image);
	material.set2DTexture(texture);
	material.setTransparent(true);
	material.setColor(new VENUS.Vector4(1, 1, 0, 1));
	moonNode.setPosition(new VENUS.Vector3(100, 100, 100));
	scene.getRootSceneNode().addChild(moonNode);
};

function createSkyBox() {
	var sceneManager = VENUS.Engine.getInstance().getSceneManager();
	var resManager = VENUS.Engine.getInstance().getResourceManager();

	var scene = sceneManager.getCurrentScene();

	var stars = resManager.getImageByPath("/images/stars.png");
	var skyboxNode = scene.createSkyBoxSceneNode("skybox", 50000, stars, stars, stars, stars, stars, stars);

	scene.getRootSceneNode().addChild(skyboxNode);
};

function createStars() {
	var sceneManager = VENUS.Engine.getInstance().getSceneManager();
	var resManager = VENUS.Engine.getInstance().getResourceManager();

	var scene = sceneManager.getCurrentScene();

	// create billboard
	var keepDistanceFromCameraAnimation = new VENUS.KeepDistanceFromCameraAnimation();
	var image = VENUS.Engine.getInstance().getResourceManager().getImageByPath("/images/sun.png");
	var billboardNode = scene.createBillboardSceneNode(10000, 10000, image);
	billboardNode.setPosition(new VENUS.Vector3(0, 0, - 20000));
	var material = billboardNode.getSceneObject().getMaterial();
	material.setColor(new VENUS.Vector4(1, 0, 0, 1));
	billboardNode.addAnimation(keepDistanceFromCameraAnimation);
	scene.getRootSceneNode().addChild(billboardNode);

};

function createLights() {
	var sceneManager = VENUS.Engine.getInstance().getSceneManager();
	var resManager = VENUS.Engine.getInstance().getResourceManager();

	var scene = sceneManager.getCurrentScene();

	// point lights
	var pointLightAmbientColor = new VENUS.Vector3(0.5, 0.5, 0.5);
	var pointLightDiffuseColor = new VENUS.Vector3(1.0, 1.0, 1.0);
	var pointLightSpecularColor = new VENUS.Vector3(0.5, 0.5, 0.5);

	var position = new VENUS.Vector3(0, 1000, 0);
	var pointLightNode = scene.createPointLightSceneNode(pointLightAmbientColor, pointLightDiffuseColor, pointLightSpecularColor, position);
	scene.getRootSceneNode().addChild(pointLightNode);

};

function createUniversityScene() {
	// create Scene
	var sceneManager = VENUS.Engine.getInstance().getSceneManager();
	var scene = sceneManager.createScene("basic");

	sceneManager.setCurrentScene(scene);

	//create camera 
	var cameraNode = scene.createFPSCameraSceneNode(45, 1, 200000, new VENUS.Vector3(0, 0, 0), new VENUS.Vector3(0, 0, - 1), new VENUS.Vector3(0, 1, 0));
	scene.setCurrentCameraNode(cameraNode);

	createBattleShips();
	createPlanets();
	createComets();
	createSkyBox();
	createLights();
	createStars();
}

