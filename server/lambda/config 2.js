
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
	"locationInformation" : "https://maps.googleapis.com/maps/api/place/textsearch/json",
	"searchFlightAlternate" : "https://2adgulhr53.execute-api.us-east-1.amazonaws.com/rotateApi"
}


module.exports.myFlightTypesList = [
   {
   	"flightType" : "cheap"
   },
   {
   	"flightType" : "cheapest"
   },
   {
   	"flightType" : "alternate"
   },
   {
   	"flightType" : "alternative"
   },
   {
   	"flightType" : "early"
   },
   {
   	"flightType" : "earliest"
   }
]

module.exports.getTerminalInfo = [
  
   {
   	"cityName" : "Delhi",
   	"terminal" : 'Terminal <break time="0.3s"/> 3'
   },
   {
   	"cityName" : "Bombay",
   	"terminal" : 'New Terminal <break time="0.3s"/> 2'
   },
   {
   	"cityName" : "Mumbai",
   	"terminal" : 'New Terminal <break time="0.3s"/> 2'
   },
   {
   	"cityName" : "Kolkata",
   	"terminal" : 'Terminal <break time="0.3s"/> 2'
   },
   {
   	"cityName" : "Ahmedabad",
   	"terminal" : 'Terminal <break time="0.3s"/> 1'
   }
]

module.exports.airpotCodesList = [
	
	{
		"cityName": "Agra",
		"airportCode": "AGR",
		"airportName": "Kheria",
		"Country name": "India"
	},
	{
		"cityName": "Bagdogra",
		"airportCode": "IXB",
		"airportName": "Bagdogra",
		"Country name": "India"
	},
	{
		"cityName": "Ahmedabad",
		"airportCode": "AMD",
		"airportName": "Ahmedabad",
		"countryName": "India"
	},
	{
		"cityName": "Allahabad",
		"airportCode": "IXD",
		"airportName": "Bamrauli",
		"Country name": "India"
	},
	{
		"cityName": "Amritsar",
		"airportCode": "ATQ",
		"airportName": "Raja Sansi",
		"Country name": "India"
	},
	{
		"cityName": "Bangalore",
		"airportCode": "BLR",
		"airportName": "Hal",
		"Country name": "India"
	},
	{
		"cityName": "Bhubaneswar",
		"airportCode": "BBI",
		"airportName": "Bhubaneswar",
		"Country name": "India"
	},
	{
		"cityName": "Chandigarh",
		"airportCode": "IXC",
		"airportName": "Chandigarh",
		"Country name": "India"
	},
	{
		"cityName": "Chennai",
		"airportCode": "MAA",
		"airportName": "Meenambakkam",
		"Country name": "India"
	},
	{
		"cityName": "Madras",
		"airportCode": "MAA",
		"airportName": "Meenambakkam",
		"Country name": "India"
	},
	{
		"cityName": "Delhi",
		"airportCode": "DEL",
		"airportName": "Indira Gandhi Intl",
		"Country name": "India"
	},
	{
		"cityName": "Guwahati",
		"airportCode": "GAU",
		"airportName": "Borjhar",
		"Country name": "India"
	},
	{
		"cityName": "Gawahati",
		"airportCode": "GAU",
		"airportName": "Borjhar",
		"Country name": "India"
	},
	{
		"cityName": "Goa",
		"airportCode": "GOI",
		"airportName": "Dabolim",
		"Country name": "India"
	},
	{
		"cityName": "Hyderabad",
		"airportCode": "HYD",
		"airportName": "Begumpet Airport",
		"Country name": "India"
	},
	{
		"cityName": "Indore",
		"airportCode": "IDR",
		"airportName": "Indore",
		"Country name": "India"
	},
	{
		"cityName": "Jaipur",
		"airportCode": "JAI",
		"airportName": "Sanganeer",
		"Country name": "India"
	},
	{
		"cityName": "Jammu",
		"airportCode": "IXJ",
		"airportName": "Satwari",
		"Country name": "India"
	},
	{
		"cityName": "Kanpur",
		"airportCode": "KNU",
		"airportName": "Kanpur",
		"Country name": "India"
	},
	{
		"cityName": "Kolkata",
		"airportCode": "CCU",
		"airportName": "Netaji Subhas Chandra",
		"Country name": "India"
	},
	{
		"cityName": "Kota",
		"airportCode": "KTU",
		"airportName": "Kota",
		"Country name": "India"
	},
	{
		"cityName": "Leh",
		"airportCode": "IXL",
		"airportName": "Bakula Rimpoche",
		"Country name": "India"
	},
	{
		"cityName": "Lucknow",
		"airportCode": "LKO",
		"airportName": "Amausi",
		"Country name": "India"
	},
	{
		"cityName": "Mumbai",
		"airportCode": "BOM",
		"airportName": "Chhatrapati Shivaji",
		"Country name": "India"
	},
	{
		"cityName": "Bombay",
		"airportCode": "BOM",
		"airportName": "Chhatrapati Shivaji",
		"Country name": "India"
	},
	{
		"cityName": "Nagpur",
		"airportCode": "NAG",
		"airportName": "Sonegaon",
		"Country name": "India"
	},
	{
		"cityName": "Port Blair",
		"airportCode": "IXZ",
		"airportName": "Port Blair",
		"Country name": "India"
	},
	{
		"cityName": "Pune",
		"airportCode": "PNQ",
		"airportName": "Lohegaon",
		"Country name": "India"
	},
	{
		"cityName": "Srinagar",
		"airportCode": "SXR",
		"airportName": "Srinagar",
		"Country name": "India"
	},
	{
		"cityName": "Thiruvananthapuram",
		"airportCode": "TRV",
		"airportName": "International",
		"Country name": "India"
	},
	{
		"cityName": "Udaipur",
		"airportCode": "UDR",
		"airportName": "Dabok",
		"Country name": "India"
	},
	{
		"cityName": "Varanasi",
		"airportCode": "VNS",
		"airportName": "Varanasi",
		"Country name": "India"
	},
	{
		"cityName": "Guwahati",
		"airportCode": "GAU",
		"airportName": "Guwahati",
		"Country name": "India"
	},
	{
		"cityName": "Ranchi",
		"airportCode": "IXR",
		"airportName": "Birsa Munda Airport",
		"Country name": "India"
	},
	{
		"cityName": "Baghdad",
		"airportCode": "IXB",
		"airportName": "Bagdogra",
		"Country name": "India"
	},
	{
		"cityName": "Baghdogra",
		"airportCode": "IXB",
		"airportName": "Bagdogra",
		"Country name": "India"
	},
	{
		"cityName": "Lehee",
		"airportCode": "IXL",
		"airportName": "Bakula Rimpoche",
		"Country name": "India"
	}

]