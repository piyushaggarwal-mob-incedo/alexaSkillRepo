
var request = require('request-promise');
var testConfig = require('./appcms-test-config');

module.exports.getAccessToken = function(refesh_token, client_id, client_secret){
   var options = {
	    method: 'POST',
	    uri: testConfig.amazonConfig.amazonTokenUrl,
	    form: {
	        grant_type: 'refresh_token',
	        refresh_token: refesh_token,
	        client_id: client_id,
	        client_secret: client_secret
	    },
	    headers: {
	        'content-type': 'application/x-www-form-urlencoded' 
	    },
	    json: true
   };

  return new Promise(function (resolve,reject) {
	request(options).then(function (body) {
        resolve(body);
    }).catch(function (err) {
        reject(err);
    });
  });
}


module.exports.testCasePromise = function(inputTestCase, myAccessToken, mySkillId){

  var options = {
	    method: 'POST',
	    uri: testConfig.amazonConfig.amazonSkillBaseUrl + mySkillId + "/simulations" ,
	    body: inputTestCase,
	    headers: {
	        'content-type': 'application/json',
	        'Authorization': myAccessToken
	    },
	    json: true // Automatically stringifies the body to JSON 
  };

  return new Promise(function(resolve,reject){

     request(options).then(function (body) {
        
        setTimeout(function()
            { 
    		   simulateTestCase(body.id, myAccessToken, mySkillId).then(function(result){
		           resolve(result);
		        }).catch(function(error){
		           reject(error);
		        })
        },800);

     }).catch(function (err) {
        reject(err);
     });

  });
}

var simulateTestCase = function(simulationId, myAccessToken, mySkillId){

    var options = {
        method: 'GET',
	    uri: testConfig.amazonConfig.amazonSkillBaseUrl + mySkillId + "/simulations/" + simulationId,
	    headers: {
	        'Authorization': myAccessToken,
	        'content-type': 'application/json'
	    },
	    json: true // Automatically parses the JSON string in the response
   };

   return new Promise(function(resolve,reject){
	     request(options).then(function (body) {
	        resolve(body);
	     }).catch(function (err) {
	        reject(err);
	     });
   });
}



module.exports.getAllSkillsFunction = function(myAccessToken){

     var options = {
        method: 'GET',
	    uri: getAllSkills,
	    headers: {
	        'Authorization': myAccessToken,
	        'content-type': 'application/json'
	    },
	    json: true // Automatically parses the JSON string in the response
   };

   return new Promise(function(resolve,reject){
	     request(options).then(function (body) {
	        resolve(body);
	     }).catch(function (err) {
	        reject(err);
	     });
   });
}
