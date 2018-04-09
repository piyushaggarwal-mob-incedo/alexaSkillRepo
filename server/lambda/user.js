
var request = require('request-promise');
var moment = require('moment');
var config = require('./config');

var userDetails = {
	myUserName : "",
	myUserId : ""
}

var authDate = {
	signatureTimestamp : "",
	myTimeStamp : " "
};

module.exports.getUserInfo = function(myAccessToken){
   var options = {
	  	method: 'GET',
	    uri: config.serverConfig.getUserInfoUrl,
	    qs:{
	        access_token: myAccessToken
        },
        json:true
    };
    return new Promise(function(resolve, reject){
   	   var speechText = '';
       request(options)
       .then(function(response){
           resolve(response);       
       })
       .catch(function(err){
       	  console.log(err);
          reject("Server is not responding. Please try after some time");
       });
    });
}

module.exports.getSignature = function(){

	var currentTimestamp = moment().format("YYYY-MM-DDTH:mm:ss").toString() + 'Z';
	return new Promise(function(resolve, reject){
			var headers = {
				'User-Agent': 'Super Agent/0.0.1',
				'Content-Type': 'application/x-www-form-urlencoded'
			}
			var options = {
				url: config.serverConfig.apiBase +'/signature/generate?site='+config.serverConfig.siteName+'&timestamp='
				 + currentTimestamp + '&access_key='+ config.accessKey,
				method: 'GET',
				headers: headers,
				json: true
			}

			request(options)
			       .then(function(response){
			       	   authDate.signatureTimestamp = response.signature;
			       	   authDate.myTimeStamp = currentTimestamp;
			           resolve(authDate);       
			       })
			       .catch(function(err){
			       	  console.log(err);
			          reject("Server is not responding. Please try after some time");
			       });
	});
}

module.exports.setUser = function(userName , userId){
  this.myUserName = userName;
  this.myUserId = userId;
}

