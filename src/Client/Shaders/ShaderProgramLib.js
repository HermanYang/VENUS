VENUS.ShaderProgramLib = {
	basic: {
		vert: ['attribute vec3 aVertexPosition;', 'attribute vec4 aVertexColor;', 'attribute vec2 aTextureCoord;', 'uniform mat4 uMVMatrix;', 'uniform mat4 uPMatrix;', 'varying vec2 vTextureCoord;','varying vec4 vColor;', 'void main(void) {', 'gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);', 'vTextureCoord = aTextureCoord;', 'vColor = aVertexColor;','}'].join('\n'),
		frag: ['precision mediump float;', 'varying vec2 vTextureCoord;','varying vec4 vColor;', 'uniform sampler2D uSampler;','void main(void) {', 'gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));', '}'].join('\n')
	}
};

