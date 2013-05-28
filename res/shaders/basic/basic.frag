precision mediump float;

// material attributes
uniform float uAlpha;
uniform vec4 uColor;
uniform sampler2D u2DTextureSampler;
uniform samplerCube uCubeTextureSampler;

uniform int uTextureMode;

varying vec2 vTextureCoord;
varying vec3 vCubeMapTextureCoord;
varying vec3 vLightColor;

// Texture mode
const int TEXTURE_2D = 0;
const int TEXTURE_CUBE_MAP = 1;

void main(void) {
	vec4 textureColor = vec4(0.0, 0.0, 0.0, 0.0);

	if(uTextureMode == TEXTURE_2D){
		textureColor = texture2D(u2DTextureSampler, vTextureCoord);
	}

	if(uTextureMode == TEXTURE_CUBE_MAP){
		textureColor = textureCube(uCubeTextureSampler, vCubeMapTextureCoord);
	}

	vec4 fragColor = vec4(textureColor.rgb * vLightColor.rgb, textureColor.a * uAlpha );
	fragColor = fragColor * uColor;
	gl_FragColor = fragColor;
}

