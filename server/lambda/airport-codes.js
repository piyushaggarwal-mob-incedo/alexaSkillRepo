var config = require('./config');


module.exports.getCodeFromCity = function(myCity){
 for(var i=0; i< config.airpotCodesList.length;i++){
 	if(config.airpotCodesList[i].cityName.toLowerCase() === myCity.toLowerCase())
 	  return config.airpotCodesList[i].airportCode;
 }
}

