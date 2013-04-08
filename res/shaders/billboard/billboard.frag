precision mediump float;

uniform sampler2D uTexture;
varying vec2 vTextureCoord;

void main(void){
	vec4 texturColor = texture2D(uTexture, vTextureCoord);
	gl_FragColor = texturColor;
}
