var config = require('./config');
var stringSimilarity = require('string-similarity');
 

var cityNameArray=[];
var terminalNamearray=[];
var flightListTypes=[];


for(var k = 0 ; k < config.myFlightTypesList.length ; k++){
  flightListTypes.push(config.myFlightTypesList[k].flightType);
}

for(var i = 0 ; i < config.airpotCodesList.length ; i++){
  cityNameArray.push(config.airpotCodesList[i].cityName);
}


for(var j = 0 ; j < config.getTerminalInfo.length ; j++){
  terminalNamearray.push(config.getTerminalInfo[j].cityName);
}


module.exports.getSimilaryCityName = function(myCity){
	var cityMatches = stringSimilarity.findBestMatch(myCity, cityNameArray);
	return cityMatches.bestMatch.target;
}

module.exports.getSimilarTerminalCityName = function(myCity){
	var cityMatches = stringSimilarity.findBestMatch(myCity, terminalNamearray);
	return cityMatches.bestMatch.target;
}

module.exports.getSimilarFlightType = function(myFlightType){
	var flightMatches = stringSimilarity.findBestMatch(myFlightType, flightListTypes);
	return flightMatches.bestMatch.target;
}


module.exports.getCodeFromCity = function(myCity){
 for(var i=0; i< config.airpotCodesList.length;i++){
 	if(config.airpotCodesList[i].cityName.toLowerCase() === myCity.toLowerCase())
 	  return config.airpotCodesList[i].airportCode;
 }
}

module.exports.getCityFromCode = function(myCode){
  for(var i=0; i< config.airpotCodesList.length;i++){
 	if(config.airpotCodesList[i].airportCode.toLowerCase() === myCode.toLowerCase())
 	  return config.airpotCodesList[i].cityName;
 }  
}

module.exports.getTerminalFromCity = function(myCode){
  for(var i=0; i< config.getTerminalInfo.length;i++){
 	if(config.getTerminalInfo[i].cityName.toLowerCase() === myCode.toLowerCase())
 	  return config.getTerminalInfo[i].terminal;
 }
 return "false";  
}

