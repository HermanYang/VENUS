VENUS.TextureCreater = {};

VENUS.TextureCreater.createTextureFromUrl = function(url, textureSettings){
	var image = new Image();
	image.src = url;
	
	var texture = new VENUS.Texture(image, textureSettings);

	// load the image through url asynchronously
	var onload = function(){ this.initialized = true;};
	image.addEventListener("load", onload ,false);
	return texture;
}
