attribute vec3 aVertex;
attribute vec3 aNormal;
attribute vec2 aTextureCoord; 

uniform mat4 uModelViewMatrix; 
uniform mat4 uProjectionMatrix;
uniform mat4 uNormalMatrix;

varying vec2 vTextureCoord;
varying vec3 vCubeMapTextureCoord;
varying vec4 vVertex;
varying vec3 vTransformedNormal;
varying mat4 vModelViewMatrix;

void main(void) {

	vTextureCoord = aTextureCoord;
	vCubeMapTextureCoord = normalize(aVertex);

	vVertex = uModelViewMatrix * vec4(aVertex, 1.0);
	vTransformedNormal = normalize( vec3(uNormalMatrix * vec4(aNormal, 1.0)) );
	vModelViewMatrix = uModelViewMatrix;

	gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertex, 1.0);
} 
