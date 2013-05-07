UIManager = function(){
	this._loadingPage = new LoadingPage(this._createInstructionBox());
	this._pausingPage = new PausingPage(this._createInstructionBox());
};

UIManager._instance = null;

UIManager.getInstance = function(){
	if(UIManager._instance === null){
		UIManager._instance = new UIManager();
	}
	return UIManager._instance;
};

UIManager.prototype._createInstructionBox = function(){
	var instructionBox = new InstructionBox();
	instructionBox.addInstruction("Press Esc to pause");
	instructionBox.addInstruction("Press W S A D to move around");
	instructionBox.addInstruction("Move your mouse to look around");
	return instructionBox; 
};

UIManager.prototype.getLoadingPage = function(){
	return this._loadingPage;
};

UIManager.prototype.getPausingPage = function(){
	return this._pausingPage;
};
