uniform vec3 uCenterPosition;

attribute vec3 aParticleDirection;
attribute float aParticleSpeed;
attribute float aParticleLifeTime;
attribute float aParticleElapse;

varying float vLifetime;

void main(void){
	gl_Position = vec4( uCenterPosition + aParticleDirection * aParticleSpeed * aParticleElapse, 1.0);
	gl_PointSize = 40.0;
	vLifetime = 1.0 - (aParticleElapse/ aParticleLifeTime);
	vLifetime = clamp(vLifetime, 0.0, 1.0);
}
