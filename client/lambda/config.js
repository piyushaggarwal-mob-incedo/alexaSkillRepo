
// var stringSimilarity = require('string-similarity');
 
// var similarity = stringSimilarity.compareTwoStrings('The old ', 'the old testament'); 
 
// var matches = stringSimilarity.findBestMatch('the', ['The Great', 'The old', 'The moment']);

// console.log(similarity);
// console.log(matches);

module.exports.serverConfig = {
	"vistaaraBaseUrl" : "https://s7.arms.aero/VISTARA/GetFlightsForCMS/CMSService.asmx/GetFlightsForCMS",
	"locationSearch" : "https://www.metaweather.com/api/location/search/",
	"weatherInfo" : "https://www.metaweather.com/api/location/",
	"flightSearchInfo" : "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search",
	"locationInformation" : "https://maps.googleapis.com/maps/api/place/textsearch/json"
}
module.exports.getTerminalInfo = [
  
   {
   	"cityName" : "DELHI",
   	"terminal" : 'Terminal <break time="0.3s"/> 3'
   },
   {
   	"cityName" : "BOMBAY",
   	"terminal" : 'New Terminal <break time="0.3s"/> 2'
   },
   {
   	"cityName" : "MUMBAI",
   	"terminal" : 'New Terminal <break time="0.3s"/> 2'
   },
   {
   	"cityName" : "KOLKATA",
   	"terminal" : 'Terminal <break time="0.3s"/> 2'
   },
   {
   	"cityName" : "Ahmedabad",
   	"terminal" : 'Terminal <break time="0.3s"/> 1'
   }
]

