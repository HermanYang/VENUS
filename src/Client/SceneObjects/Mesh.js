VENUS.Mesh = function(vertices, indices, normals, textureCoords) {
	this._vertices = vertices === undefined ? null : vertices;
	this._indices = indices === undefined ? null : indices;
	this._normals = normals === undefined ? null : normals;
	this._textureCoords = textureCoords === undefined ? null : textureCoords;

	this.vertexBufferNeedUpdate = this._vertices == null ? false : true;
	this.indexBufferNeedUpdate = this._indices == null ? false : true;
	this.normalBufferNeedUpdate = this._normals == null ? false : true;
	this.textureCoordBufferNeedUpdate = this._textureCoords == null ? false : true;

	this.vertexBuffer = null;
	this.indexBuffer = null;
	this.normalBuffer = null;
	this.textureCoordBuffer = null;

};

VENUS.Mesh.prototype.render = function(modelViewMatrix){
	
}
VENUS.Mesh.prototype.setVertices = function(vertices){
	this._vertices = vertices;
	this.vertexBufferNeedUpdate = this._vertices == null ? false : true;
	return this;
}

VENUS.Mesh.prototype.setIndices = function(indices){
	this._indices = indices;
	this.indexBufferNeedUpdate = this._indices == null ? false : true;
	return this;
}

VENUS.Mesh.prototype.setNormals= function(normals){
	this._normals = normals;
	this.normalBufferNeedUpdate = this._normals == null ? false : true;
	return this;
}

VENUS.Mesh.prototype.setTextureCoords= function(textureCoords){
	this._textureCoords = textureCoords;
	this.textureCoordNeedBufferUpdate = this._textureCoords == null ? false : true;
	return this;
}

VENUS.Mesh.prototype.getVertices = function(){
	return this._vertices;
}

VENUS.Mesh.prototype.getIndices = function(){
	return this._indices;
}

VENUS.Mesh.prototype.getNormals = function(){
	return this._normals;
}

VENUS.Mesh.prototype.getTextureCoords = function(){
	return this._textureCoords;
}
