precision mediump float;

uniform vec4 uParticleColor;

varying float vLifetime;

uniform sampler2D uTexture;

void main(void){
	vec4 texturColor = texture2D(uTexture, gl_PointCoord);
	vec4 color = vec4(1.0, 1.0, 1.0, 1.0);
	gl_FragColor = texturColor ;
	gl_FragColor.a *= vLifetime;
}
