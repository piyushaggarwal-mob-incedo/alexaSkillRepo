var config = require('./config');
var request = require('request-promise');


var interactionModelBuilder = {
	"languageModel" : {
		"types":[],
		"intents":[],
		"invocationName" : ""
	}
};


var skillCreationModelOne ={
    "vendorId": "",
    "skillManifest": {
        "publishingInformation": {
            "locales": {
                "en-US": {
                    "summary": "Hoichoi contains collection of Bengali Movies.",
                    "examplePhrases": [
                        "Alexa, Launch Hoichoi",
                        "Alexa, Launch Hoichoi",
                        "Alexa, Launch Hoichoi"
                    ],
                    "keywords": [
                        "Bengali Songs",
                        "Songs",
                        "Hoichoi"
                    ],
                    "smallIconUri": "https://s3.amazonaws.com/mysomelogos/hoichoi108.png",
                    "largeIconUri": "https://s3.amazonaws.com/mysomelogos/hoichoi512.png",
                    "name": "Hoichoi",
                    "description": "Hoichoi contains collection of Bengali Movies."
                }
            },
            "isAvailableWorldwide": true,
            "testingInstructions": "",
            "category": "HEALTH_AND_FITNESS",
            "distributionMode" : "PUBLIC",
            "distributionCountries": []
        },
        "apis": {
            "custom": {
                "endpoint": {
                    "uri": ""
                },
                "interfaces": [{"type":"AUDIO_PLAYER"},{"type": "VIDEO_APP"}]
            }
        },
        "manifestVersion": "1.0",
        "privacyAndCompliance": {
            "allowsPurchases": false,
            "locales": {
                "en-US": {
                    "termsOfUseUrl": "http://www.termsofuse.sampleskill.com",
                    "privacyPolicyUrl": "http://www.myprivacypolicy.hoichoi.com"
                }
            },
            "isExportCompliant": true,
            "isChildDirected": false,
            "usesPersonalInfo": false
        }
    }
};


var skillCreationModelTwo ={
    "vendorId": "",
    "skillManifest": {
        "publishingInformation": {
            "locales": {
                "en-US": {
                    "summary": "Hoichoi contains collection of Bengali Movies.",
                    "examplePhrases": [
                        "Alexa, Launch Viewlift",
                        "Alexa, Launch Viewlift",
                        "Alexa, Launch Viewlift"
                    ],
                    "keywords": [
                        "Bengali Songs",
                        "Songs",
                        "Hoichoi"
                    ],
                    "smallIconUri": "https://s3.amazonaws.com/mysomelogos/snag108.png",
                    "largeIconUri": "https://s3.amazonaws.com/mysomelogos/snag512.png",
                    "name": "Snagfilms",
                    "description": "Snagfilms contains collection of Movies."
                }
            },
            "isAvailableWorldwide": true,
            "testingInstructions": "",
            "category": "HEALTH_AND_FITNESS",
            "distributionMode" : "PUBLIC",
            "distributionCountries": []
        },
        "apis": {
            "custom": {
                "endpoint": {
                    "uri": ""
                },
                "interfaces": [{"type":"AUDIO_PLAYER"},{"type": "VIDEO_APP"}]
            }
        },
        "manifestVersion": "1.0",
        "privacyAndCompliance": {
            "allowsPurchases": false,
            "locales": {
                "en-US": {
                    "termsOfUseUrl": "http://www.termsofuse.sampleskill.com",
                    "privacyPolicyUrl": "http://www.myprivacypolicy.hoichoi.com"
                }
            },
            "isExportCompliant": true,
            "isChildDirected": false,
            "usesPersonalInfo": false
        }
    }
};


module.exports.getAccessToken = function(refesh_token, client_id, client_secret){
   var options = {
	    method: 'POST',
	    uri: config.amazonConfig.amazonTokenUrl,
	    form: {
	        grant_type: 'refresh_token',
	        refresh_token: refesh_token,
	        client_id: client_id,
	        client_secret: client_secret
	    },
	    headers: {
	        'content-type': 'application/x-www-form-urlencoded' 
	    }
   };

  return new Promise(function (resolve,reject) {
	request(options).then(function (body) {
        resolve(body);
    }).catch(function (err) {
        reject(err);
    });
  });
}

module.exports.getSkillCreateJson = function(skillJsonUrl){
     var options = {
        method: 'GET',
        uri: skillJsonUrl,
     };

  return new Promise(function (resolve,reject) {
    request(options).then(function (body) {
        resolve(body);
    }).catch(function (err) {
        reject(err);
    });
  });
}

module.exports.createSkill = function(inputRequestJson, accountAccessToken){

   var option;

   if(inputRequestJson.invocationName == "Hoichoi"){
   	
   	 skillCreationModelOne.vendorId = inputRequestJson.accountInfo.vendorId;
     skillCreationModelOne.skillManifest.apis.custom.endpoint.uri = inputRequestJson.accountInfo.awsLambdaUrl;
     //skillCreationModel.skillManifest.publishingInformation.locales.en-US.name = inputRequestJson.skillName;

     options = {
		    method: 'POST',
	        uri: config.amazonConfig.amazonSkillBaseUrl,
		    body: skillCreationModelOne,
		    json: true,
		    headers: {
	          'content-type': 'application/json' ,
	          'Authorization': accountAccessToken
	        }
      };
   }else{

   	 skillCreationModelTwo.vendorId = inputRequestJson.accountInfo.vendorId;
     skillCreationModelTwo.skillManifest.apis.custom.endpoint.uri = inputRequestJson.accountInfo.awsLambdaUrl;
     //skillCreationModel.skillManifest.publishingInformation.locales.en-US.name = inputRequestJson.skillName;

     options = {
		    method: 'POST',
	        uri: config.amazonConfig.amazonSkillBaseUrl,
		    body: skillCreationModelTwo,
		    json: true,
		    headers: {
	          'content-type': 'application/json' ,
	          'Authorization': accountAccessToken
	        }
      };

   }
  
  console.log(options);
  return new Promise(function (resolve, reject) {
	request(options).then(function (body) {
		body.access_token = accountAccessToken;
        resolve(body);
    }).catch(function (err) {
        reject(err);
    });

  });
}







