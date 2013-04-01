VENUS.Matrix33 = function(matrix){
	this._elements = mat3.create();
	if( matrix != undefined ){
		if(matrix instanceof VENUS.Matrix33){
			mat3.copy(this._elements, matrix.getElements());
		}

		if(matrix instanceof VENUS.Matrix44){
			mat3.(this._elements, matrix.getElements());
		}
	}
};

VENUS.Matrix33.prototype.getElements = function(){
	return this._elements;
};
