uniform vec3 uPosition;
uniform float uWidth;
uniform float uHeight;
uniform mat4 uProjectionMatrix;
uniform mat4 uViewMatrix;

attribute vec2 aOffsetDirection;
attribute vec2 aTextureCoord;

varying vec2 vTextureCoord;

void main(void){
	vec4 position = vec4(uPosition, 1.0);
	position =  uViewMatrix * position;
	position.x += aOffsetDirection.x * 0.5 * uWidth;
	position.y += aOffsetDirection.y * 0.5 * uHeight;
	gl_Position = uProjectionMatrix *  position;
	vTextureCoord = aTextureCoord;
}
