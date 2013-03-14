VENUS.assert = function(conditon, errMsg){
	if(!conditon){
		alert(errMsg);
		throw new Error(errMsg);
	}
}
