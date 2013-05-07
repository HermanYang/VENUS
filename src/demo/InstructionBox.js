InstructionBox = function(){
	this._div = document.createElement("div");
	this._div.style.position = "absolute";
	this._div.style.textAlign = "left";
	this._div.style.color = "#ff0000";
	this._div.style.cursor = "default";
	this._div.style.left = 0;
	this._div.style.top = 0;

	var title = document.createElement("span");

	title.innerHTML = "Instruction";
	title.style.fontSize = "30px";
	title.style.textAlign = "center";

	this._div.appendChild(title);
	this._div.appendChild(document.createElement("br"));

};

InstructionBox.prototype.setPosition = function(left, top){
	this._div.style.left = left;
	this._div.style.top = top;
};

InstructionBox.prototype.getContainer = function(){
	return this._div;
};

InstructionBox.prototype.addInstruction = function(instruction){
	var span = document.createElement("span");
	var br = document.createElement("br");
	span.innerHTML = instruction;
	span.style.fontSize = "20px";
	this._div.appendChild(br);
	this._div.appendChild(span);
};
