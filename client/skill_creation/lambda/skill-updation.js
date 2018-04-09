var config = require('./config');
var request = require('request-promise');


var interactionModelBuilder = {
	"interactionModel":{
		 "languageModel" : {
		       "types":[],
		       "intents":[],
		       "invocationName" : "Vistara App"
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


module.exports.updateSkill = function(mySkillID, inputRequestJson, accountAccesToken){
     var myInteractionModel = buildInteractionModel(inputRequestJson);
     myInteractionModel.interactionModel.languageModel.invocationName = inputRequestJson.invocationName;


     var options = {
		  method: 'POST',
	      uri: config.amazonConfig.amazonSkillBaseUrl + mySkillID + "/interactionModel/locales/en-IN",
		  body: myInteractionModel,
		  json: true,
		  headers: {
	          'content-type': 'application/json' ,
	          'Authorization': accountAccesToken
	       }
      };


	  return new Promise(function (resolve, reject) {
		request(options).then(function (body) {
			body.mySkillID = mySkillID;
	        body.access_token = accountAccesToken;
            resolve(body);
	    }).catch(function (err) {
	        reject(err);
	    });
	  });
}

function buildInteractionModel(input){
	console.log(input.intentsList);
	for (var key in input.intentsList) {
	  var intentValues = {
	  	"name":"",
	  	"samples":[],
	  	"slots":[]
	  };

	  if (input.intentsList.hasOwnProperty(key)) {
	  	  intentValues.name = input.intentsList[key].name;
	  	  //This is the slot array to contain distinct slot values
	  	  var slotsArray=[];
	      for(var innerKey in input.intentsList[key].samples){
	        intentValues.samples[innerKey] = input.intentsList[key].samples[innerKey];
	        if(checkForSlotValues(intentValues.samples[innerKey]).length>0){
	          //console.log(checkForSlotValues(intentValues.samples[innerKey]));
	          //checkForSlotValues will return an array containg words starting with { amd ending with }
	          for (var i = 0; i < checkForSlotValues(intentValues.samples[innerKey]).length; i++){
	              if(slotsArray.length === 0){
	          	    slotsArray.push(checkForSlotValues(intentValues.samples[innerKey])[i]);
	              }else{
	                if(checkDuplicates(slotsArray,checkForSlotValues(intentValues.samples[innerKey])[i]))
	                  slotsArray.push(checkForSlotValues(intentValues.samples[innerKey])[i]);
	              }
	          }
	        }
	      }
	      //console.log(slotsArray);
	      if(slotsArray.length>0){
	          var slotObj = {};
	          for(var i=0; i<slotsArray.length; i++){
	            slotObj.name = slotsArray[i];
	          }
	          intentValues.slots.push(slotObj);
	      }
	      interactionModelBuilder.interactionModel.languageModel.intents.push(intentValues);
	  }
	}
	return interactionModelBuilder;
}

function checkForSlotValues(checkForSlots){
  var slotMatchArray=[];
  var regExp = /\{([^}]+)\}/g;
  var matches = checkForSlots.match(regExp);
  if(matches!=null)
  for (var i = 0; i < matches.length; i++) {
     var str = matches[i];
     slotMatchArray.push(str.substring(1, str.length - 1));
   }
   return slotMatchArray;
}

function checkDuplicates(slotsArray,valueCheck){
  for(var i=0; i < slotsArray.length; i++){
    if(slotsArray[i] === valueCheck)
    	return 0;
    else
    	return 1;
  }
}

