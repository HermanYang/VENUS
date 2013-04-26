uniform mat4 uModelMatrix; 
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uNormalMatrix;
uniform vec3 uCameraPositionInWorld;

// material attributes
uniform float uMaterialShininess;
uniform bool uEnableLighting;

// Direction lights attributes
const int MAX_DIRECTION_LIGHT_AMOUNT = 10;
uniform bool uDirectionLightAvailableList[MAX_DIRECTION_LIGHT_AMOUNT];
uniform vec3 uDirectionLightDirections[MAX_DIRECTION_LIGHT_AMOUNT];
uniform vec3 uDirectionLightAmbientColors[MAX_DIRECTION_LIGHT_AMOUNT];
uniform vec3 uDirectionLightDiffuseColors[MAX_DIRECTION_LIGHT_AMOUNT];
uniform vec3 uDirectionLightSpecularColors[MAX_DIRECTION_LIGHT_AMOUNT];

// Point lights attributes
const int MAX_POINTL_LIGHT_AMOUNT = 10;
uniform bool uPointLightAvailableList[MAX_POINTL_LIGHT_AMOUNT];
uniform vec3 uPointLightPositions[MAX_POINTL_LIGHT_AMOUNT];
uniform vec3 uPointLightAmbientColors[MAX_POINTL_LIGHT_AMOUNT];
uniform vec3 uPointLightDiffuseColors[MAX_POINTL_LIGHT_AMOUNT];
uniform vec3 uPointLightSpecularColors[MAX_POINTL_LIGHT_AMOUNT];

// Spot lights attributes
const int MAX_SPOT_LIGHT_AMOUNT = 10;
uniform bool uSpotLightAvailableList[MAX_POINTL_LIGHT_AMOUNT];
uniform float uSpotLightCosCutoffs[MAX_SPOT_LIGHT_AMOUNT];
uniform vec3 uSpotLightPositions[MAX_SPOT_LIGHT_AMOUNT];
uniform vec3 uSpotLightDirections[MAX_SPOT_LIGHT_AMOUNT];
uniform vec3 uSpotLightAmbientColors[MAX_POINTL_LIGHT_AMOUNT];
uniform vec3 uSpotLightDiffuseColors[MAX_SPOT_LIGHT_AMOUNT];
uniform vec3 uSpotLightSpecularColors[MAX_SPOT_LIGHT_AMOUNT];

attribute vec3 aVertex;
attribute vec3 aNormal;
attribute vec2 aTextureCoord; 

varying vec2 vTextureCoord;
varying vec3 vCubeMapTextureCoord;
varying vec3 vLightColor;

void applyDirectionLights( const in vec3 normal, const in vec3 vertexPosition, const in float materialShininess, inout vec3 ambientColor, inout vec3 diffuseColor, inout vec3 specularColor){
	float diffuseFactor = 0.0;
	float specularFactor = 0.0;

	vec3 eyeDirection = normalize(uCameraPositionInWorld - vertexPosition);
	vec3 lightDirection;
	vec3 reflectionDirection;

	for(int i = 0; i < MAX_DIRECTION_LIGHT_AMOUNT; ++i){
		if(uDirectionLightAvailableList[i]){
			lightDirection = uDirectionLightDirections[i];

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

	vec3 eyeDirection = normalize(uCameraPositionInWorld - vertexPosition);
	vec3 lightPosition;
	vec3 lightDirection;
	vec3 reflectionDirection;

	for(int i = 0; i < MAX_POINTL_LIGHT_AMOUNT; ++i){
		if(uPointLightAvailableList[i]){
			lightPosition = uPointLightPositions[i];
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

	vec3 eyeDirection = normalize(uCameraPositionInWorld - vertexPosition);
	vec3 lightPosition;
	vec3 lightDirection;
	vec3 spotLightDirection;
	vec3 reflectionDirection;

	for(int i = 0; i < MAX_SPOT_LIGHT_AMOUNT; ++i){
		if(uSpotLightAvailableList[i]){
			lightPosition = uSpotLightPositions[i];
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

	vec4 vertex = uModelMatrix * vec4(aVertex, 1.0);
	vec3 transformedNormal = normalize( vec3(uNormalMatrix * vec4(aNormal, 1.0)) );

	vec3 diffuseColor = vec3(0.0, 0.0, 0.0);
	vec3 specularColor = vec3(0.0, 0.0 ,0.0);
	vec3 ambientColor = vec3(0.0, 0.0, 0.0);

	if(uEnableLighting){
		applyDirectionLights(transformedNormal, vertex.xyz, uMaterialShininess, ambientColor, diffuseColor, specularColor);
		applyPointLights(transformedNormal, vertex.xyz, uMaterialShininess, ambientColor, diffuseColor, specularColor);
		applySpotLights(transformedNormal, vertex.xyz, uMaterialShininess, ambientColor, diffuseColor, specularColor);

		vLightColor = ambientColor + diffuseColor + specularColor;
	}
	else{
		vLightColor = vec3(1.0, 1.0, 1.0 );
	}

	vTextureCoord = aTextureCoord;
	vCubeMapTextureCoord = normalize(aVertex);

	gl_Position = uProjectionMatrix * uViewMatrix * vertex;
} 
