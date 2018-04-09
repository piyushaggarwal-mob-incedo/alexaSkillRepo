var config = require('./config');
var request = require('request-promise');


var accountLinkingRequest = {
  "accountLinkingRequest": {
    "type": "AUTH_CODE",
    "authorizationUrl": "https://staging4.partners.viewlift.com/oauth",
    "accessTokenUrl": "https://fqppmaahm9.execute-api.us-east-1.amazonaws.com/release/oauth2/token",
    "accessTokenScheme": "REQUEST_BODY_CREDENTIALS"
  }
};

module.exports.updateOAuthLinking = function (inputRequestJson, accountAccessToken, mySkillID) {
   
   accountLinkingRequest.accountLinkingRequest.clientId = inputRequestJson.oauthAccountLinkingInfo.clientId;
   accountLinkingRequest.accountLinkingRequest.clientSecret = inputRequestJson.oauthAccountLinkingInfo.clientSecret;
   var options = {
            method: 'PUT',
            uri: config.amazonConfig.amazonSkillBaseUrl + mySkillID + '/accountLinkingClient',
            body: accountLinkingRequest,
            json: true,
            headers: {
              'content-type': 'application/json' ,
              'Authorization': accountAccessToken
            }
   };

  return new Promise(function (resolve, reject) {

       request(options).then(function (body) {
          resolve(body);
       }).catch(function (err) {
          reject(err);
       });
 
   }); 

}




