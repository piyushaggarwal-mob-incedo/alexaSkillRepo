var config = require('./config');
var request = require('request-promise');


var interactionModelBuilder = {
	"languageModel" : {
		"types":[],
		"intents":[],
		"invocationName" : ""
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







