precision mediump float;

varying vec2 vTextureCoord;
varying vec4 vVertex;
varying vec3 vTransformedNormal;
varying mat4 vModelViewMatrix;

uniform mat4 uViewMatrix;

// Direction lights attributes
const int MAX_DIRECTION_LIGHT_AMOUNT = 10;
uniform bool uEnableDirectionLight;
uniform bool uDirectionLightAvailableList[MAX_DIRECTION_LIGHT_AMOUNT];
uniform vec3 uDirectionLightDirections[MAX_DIRECTION_LIGHT_AMOUNT];
uniform vec3 uDirectionLightAmbientColors[MAX_DIRECTION_LIGHT_AMOUNT];
uniform vec3 uDirectionLightDiffuseColors[MAX_DIRECTION_LIGHT_AMOUNT];
uniform vec3 uDirectionLightSpecularColors[MAX_DIRECTION_LIGHT_AMOUNT];

// Point lights attributes
const int MAX_POINTL_LIGHT_AMOUNT = 10;
uniform bool uEnablePointLight;
uniform bool uPointLightAvailableList[MAX_POINTL_LIGHT_AMOUNT];
uniform vec3 uPointLightPositions[MAX_POINTL_LIGHT_AMOUNT];
uniform vec3 uPointLightAmbientColors[MAX_POINTL_LIGHT_AMOUNT];
uniform vec3 uPointLightDiffuseColors[MAX_POINTL_LIGHT_AMOUNT];
uniform vec3 uPointLightSpecularColors[MAX_POINTL_LIGHT_AMOUNT];

// Spot lights attributes
const int MAX_SPOT_LIGHT_AMOUNT = 10;
uniform bool uEnableSpotLight;
uniform bool uSpotLightAvailableList[MAX_POINTL_LIGHT_AMOUNT];
uniform float uSpotLightCosCutoffs[MAX_SPOT_LIGHT_AMOUNT];
uniform vec3 uSpotLightPositions[MAX_SPOT_LIGHT_AMOUNT];
uniform vec3 uSpotLightDirections[MAX_SPOT_LIGHT_AMOUNT];
uniform vec3 uSpotLightAmbientColors[MAX_POINTL_LIGHT_AMOUNT];
uniform vec3 uSpotLightDiffuseColors[MAX_SPOT_LIGHT_AMOUNT];
uniform vec3 uSpotLightSpecularColors[MAX_SPOT_LIGHT_AMOUNT];

// material attributes
uniform float uMaterialShininess;

uniform sampler2D uSampler;

void applyDirectionLights( const in vec3 normal, const in vec3 vertexPosition, const in float materialShininess, inout vec3 ambientColor, inout vec3 diffuseColor, inout vec3 specularColor){
	float diffuseFactor = 0.0;
	float specularFactor = 0.0;

	vec3 eyeDirection = normalize(-vertexPosition);
	vec3 lightDirection;
	vec3 reflectionDirection;

	for(int i = 0; i < MAX_DIRECTION_LIGHT_AMOUNT; ++i){
		if(uDirectionLightAvailableList[i]){
			lightDirection = uDirectionLightDirections[i];

			// convert lightDirection from world coordination to view coordination
			lightDirection = normalize(lightDirection); 
			reflectionDirection = reflect(lightDirection, normal);

			diffuseFactor = max(dot(normal, -lightDirection), 0.0);
			specularFactor = pow(max(dot(reflectionDirection, eyeDirection), 0.0), materialShininess);

			ambientColor += uDirectionLightAmbientColors[i];
			diffuseColor += uDirectionLightDiffuseColors[i] * diffuseFactor;
			specularColor += uDirectionLightSpecularColors[i] * specularFactor;
		}
	}
}

void applyPointLights( const in vec3 normal, const in vec3 vertexPosition, const in float materialShininess, inout vec3 ambientColor, inout vec3 diffuseColor, inout vec3 specularColor){
	float diffuseFactor = 0.0;
	float specularFactor = 0.0;

	vec3 eyeDirection = normalize(-vertexPosition);
	vec3 lightPosition;
	vec3 lightDirection;
	vec3 reflectionDirection;

	for(int i = 0; i < MAX_POINTL_LIGHT_AMOUNT; ++i){
		if(uPointLightAvailableList[i]){
			lightPosition = uPointLightPositions[i];
			lightPosition = vec3(uViewMatrix* vec4(lightPosition, 1.0));
			lightDirection = normalize(vertexPosition - lightPosition);

			reflectionDirection = normalize(reflect(lightDirection, normal));

			diffuseFactor = max(dot(normal, -lightDirection), 0.0);
			specularFactor = pow(max(dot(reflectionDirection, eyeDirection), 0.0), materialShininess);

			ambientColor += uPointLightAmbientColors[i];
			diffuseColor += uPointLightDiffuseColors[i] * diffuseFactor;
			specularColor += uPointLightSpecularColors[i] * specularFactor;
		}
	}
}

void applySpotLights( const in vec3 normal, const in vec3 vertexPosition, const in float materialShininess, inout vec3 ambientColor, inout vec3 diffuseColor, inout vec3 specularColor){
	float diffuseFactor = 0.0;
	float specularFactor = 0.0;

	vec3 eyeDirection = normalize(-vertexPosition);
	vec3 lightPosition;
	vec3 lightDirection;
	vec3 spotLightDirection;
	vec3 reflectionDirection;

	for(int i = 0; i < MAX_SPOT_LIGHT_AMOUNT; ++i){
		if(uSpotLightAvailableList[i]){
			lightPosition = vec3(uViewMatrix * vec4(uSpotLightPositions[i], 1.0) );
			lightDirection = normalize(vertexPosition - lightPosition);
			spotLightDirection = normalize( uSpotLightDirections[i]);

			// if light is in the spot light cone then do the same as point lighting
			if( dot(lightDirection, spotLightDirection) >=  uSpotLightCosCutoffs[i]){
				reflectionDirection = normalize(reflect(lightDirection, normal));

				diffuseFactor = max(dot(normal, -lightDirection), 0.0);
				specularFactor = pow(max(dot(reflectionDirection, eyeDirection), 0.0), materialShininess);

				diffuseColor += uSpotLightDiffuseColors[i] * diffuseFactor;
				specularColor += uSpotLightSpecularColors[i] * specularFactor;
			}
			// any how ambient light effect the scene  
			ambientColor += uSpotLightAmbientColors[i];
		}
	}
}

void main(void) {
	vec3 diffuseColor = vec3(0.0, 0.0, 0.0);
	vec3 specularColor = vec3(0.0, 0.0 ,0.0);
	vec3 ambientColor = vec3(0.0, 0.0, 0.0);
	vec3 lightColor = vec3(0.0, 0.0, 0.0);

	applyDirectionLights(vTransformedNormal, vVertex.xyz, uMaterialShininess, ambientColor, diffuseColor, specularColor);

	applyPointLights(vTransformedNormal, vVertex.xyz, uMaterialShininess, ambientColor, diffuseColor, specularColor);

	applySpotLights(vTransformedNormal, vVertex.xyz, uMaterialShininess, ambientColor, diffuseColor, specularColor);

	lightColor = ambientColor + diffuseColor + specularColor;

	vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));

	gl_FragColor = vec4(textureColor.rgb * lightColor, textureColor.a);

	/*if(length(lightColor) == 0.0){
		gl_FragColor = vec4(1, 1, 1, 1);
	}*/

}
