
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var attr = require('dynamodb-data-types').AttributeValue;
// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports.saveVistaraData = function(courseData){
  var params = getParamsToInsert(courseData);
  // Call DynamoDB to add the item to the table
  return new Promise(function(resolve,reject){
     ddb.putItem(params, function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve("success");
        }
     });
  })
}


module.exports.saveFlightss = function(myUserId){ 
  var params = {
    TableName: 'tgc-dev-audio',
    Key: {
      'userId' : {S: myUserId},
    }
  };
  return new Promise(function(resolve, reject){
     ddb.getItem(params, function(err, data) {
        if (err) {
          reject("error");
        } else {
          resolve(data.Item)
          // console.log("Success", data.Item.couasrseId);
          // var unwrapped = attr.unwrap(data.Item.couasrseId['M']);
        }
     });
  });
}



var getParamsToUpdate = function(tgcUserId, playPausePosition){
  var myParams = {
      TableName : 'vistara-db',
      ExpressionAttributeValues:{
          ":r": playPausePosition,
      },
      ReturnValues:"UPDATED_NEW"
  };
  return myParams;
} 



module.exports.getFlights = function(tgcUserId){
  var params = {
    TableName: 'vistara-db',
    Key: {
      'userId' : {S: tgcUserId},
    }
  };
  return new Promise(function(resolve, reject){
     ddb.getItem(params, function(err, data) {
        if (err) {
          console.error("Unable to get item. Error JSON:", JSON.stringify(err, null, 2));
          reject(err);
        } else {
          console.log("getResumePostionUrl", JSON.stringify(data, null, 2));
          var unwrapped = attr.unwrap(data.Item);
          resolve(unwrapped);
        }
     });
  });
}



