precision mediump float;

uniform sampler2D uTexture;
uniform float uAlpha;
uniform vec4 uColor;

varying vec2 vTextureCoord;

void main(void){
	vec4 texturColor = texture2D(uTexture, vTextureCoord);
	vec4 fragColor = vec4(texturColor.rgb, texturColor.a * uAlpha) * uColor;
	gl_FragColor = fragColor;
}
