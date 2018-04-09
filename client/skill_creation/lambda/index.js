
var skillCreation = require("./skill-creation");
var skillUpdation = require("./skill-updation");
var oAuthLinking  = require("./oauth-linking");
var input;

var successResponse = {
	"VistaramodelUpdation" : {
		"status" : "failed",
		"message" : ""
	}
};

exports.handler = (event, context, callback) => {

	var skillJsonUrl = event.skillCreateUrl;
	var mySkillId = event.skillId;

    skillCreation.getSkillCreateJson(skillJsonUrl)
		.then(function(result){
			input = JSON.parse(result);
			console.log(input);
			console.log(input.accountInfo.skillRefreshToken);
			return skillCreation.getAccessToken(input.accountInfo.skillRefreshToken, input.accountInfo.clientId, input.accountInfo.clientSecret);
		})
		.then(function(result){
		  console.log(result);	
		  result = JSON.parse(result);
		  //console.log(result.access_token);
		  return skillUpdation.updateSkill(mySkillId,input,result.access_token);
		})
		.then(function (result) {
			console.log("Model Updated Successfully");
			console.log("Success");
			successResponse.modelUpdation.status="Success";
			successResponse.modelUpdation.message = "Model Updation Done Succesfully";
			return oAuthLinking.updateOAuthLinking(input, result.access_token, mySkillId)
		})
		.then(function (result) {
			successResponse.oAuthLinking.status="Success";
			successResponse.oAuthLinking.message = "Account Linking Done Succesfully";
			callback(null, successResponse);
		})
		.catch(function(error){
		  console.log(error);
		  callback(null, successResponse);
		});
};




  