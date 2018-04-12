var request = require('request-promise');
var config = require('./config');
var to_json = require('xmljson').to_json;
var airportCodes = require('./airport-codes');


var errorResponse = "Sorry. We are not able to find details you are looking for. Please try again."
var noResponseOutput = "Vistara can help you with finding the cheapest, earliest, alternative and best flights to most destinations across India";

var getCorrectTime = function(timeToConvert) {
  console.log(timeToConvert);

	var dateTimeString = "Februrary, 2011"
	dateTimeString = dateTimeString + ' ' + timeToConvert;
	console.log(dateTimeString);


	var date = new Date(dateTimeString);
	var options = {
	  hour: 'numeric',
	  minute: 'numeric',
	  hour12: true
	};
	var timeString = date.toLocaleString('en-US', options);
	return timeString;
}

var getTimeDuration = function(aTime,bTime){

    var hh=0,mm=0,ss=0;
    var date1 = new Date(aTime);
    var date2 = new Date(bTime);
    var diff = date2.getTime() - date1.getTime();
    var msec = diff;
    hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    ss = Math.floor(msec / 1000);
    msec -= ss * 1000;
    
    var myTime=" ";

    if(hh>0){
      myTime = myTime + hh + '<break time="0.1s"/> hours <break time="0.1s"/>';
    }
    if(mm>0){
      myTime = myTime + mm + '<break time="0.1s"/> minutes <break time="0.1s"/>';
    }

   
    console.log(hh + ":" + mm + ":" + ss);
    return myTime;
}


module.exports.getFlightStatus = function(flightNumber, myFlightDate, fromCity, toCity){
  var options = {
  	method: 'GET',
    uri: config.serverConfig.vistaaraBaseUrl,
    qs: {
        FlightDate: myFlightDate,
        FlightNo: flightNumber,
        TailNo: null,
        FromCity: fromCity,
        ToCity: toCity
    }
   };

   return new Promise(function(resolve, reject){
   	   var speechText = "";
       request(options)
       .then(function(response){


       	  to_json(response, function (error, data) {
       	  	  console.log(JSON.stringify(data));
              if(!checkIfTableExists(data.ArrayOfTable)){
                  speechText = 'There are no Flights Available for <break time="0.3s"/>' + flightNumber +
                  ' on <break time="0.3s"/>' + myFlightDate;
              }else{

              	  if(checkIfOneRowExists(data.ArrayOfTable.Table.FlightDetails.FlightDetail,'FlightNo')){

              	   var arrivalTime = (data.ArrayOfTable.Table.FlightDetails.FlightDetail.STA).split(" ");

	       	  	  	 var etaDate = arrivalTime[0] + ' ' + arrivalTime[1] + ' ' + arrivalTime[2];

                   var etaTime = getCorrectTime(arrivalTime[3]);

	       	  	  	 var departTime = (data.ArrayOfTable.Table.FlightDetails.FlightDetail.STD).split(" ");

	       	  	  	 var etdDate = departTime[0] + ' ' + departTime[1] + ' ' + departTime[2];

                   var etdTime = getCorrectTime(departTime[3]);

	       	  	  	 var fromCity = data.ArrayOfTable.Table.FlightDetails.FlightDetail.DepStation;
	       	  	  	 var toCity = data.ArrayOfTable.Table.FlightDetails.FlightDetail.ArrStation;

	                 speechText = speechText + 'The expected departure time is <break time="0.3s"/> '  + etdTime +
		               ' <break time="0.2s"/> and expected arrival time is <break time="0.3s"/> '  +  etaTime + 
		               ' <break time="0.2s"/> for flight number <break time="0.1s"/>  <say-as interpret-as="spell-out">' + 
		               flightNumber + '</say-as> <break time="0.3s"/>  travelling from <break time="0.2s"/> ' + 
		               airportCodes.getCityFromCode(fromCity) + 
		               ' to <break time="0.2s"/> ' + airportCodes.getCityFromCode(toCity) + ' ';
              	  }
                  else{

		       	  	  for(var i=0; i< countRows(data.ArrayOfTable.Table.FlightDetails.FlightDetail); i++){

                        console.log(data.ArrayOfTable.Table.FlightDetails.FlightDetail[i.toString()].STA);
                        
                        var arrivalTime = (data.ArrayOfTable.Table.FlightDetails.FlightDetail[i.toString()].STA).split(" ");

                        console.log(arrivalTime);
                        console.log(arrivalTime[1]);

                        var etaDate = arrivalTime[0] + ' ' + arrivalTime[1] + ' ' + arrivalTime[2];

                        console.log(etaDate);


                        var etaTime = getCorrectTime(arrivalTime[3]);

                        var departTime = (data.ArrayOfTable.Table.FlightDetails.FlightDetail[i.toString()].STD).split(" ");

                        console.log(departTime);

                        var etdDate = departTime[0] + ' ' + departTime[1] + ' ' + departTime[2];

                        var etdTime = getCorrectTime(departTime[3]);

                        var toCity = data.ArrayOfTable.Table.FlightDetails.FlightDetail[i.toString()].ArrStation;
			       	  	  	  var fromCity = data.ArrayOfTable.Table.FlightDetails.FlightDetail[i.toString()].DepStation;

                        if(i==0){
        			            speechText = ' The expected departure time is <break time="0.1s"/>' + etdTime + 
        			            ' <break time="0.1s"/> and expected arrival time is ' +  etaTime +
        			            ' <break time="0.1s"/> for flight number <break time="0.1s"/>  <say-as interpret-as="spell-out">' + 
        			            flightNumber + '</say-as> <break time="0.1s"/>  travelling from <break time="0.1s"/> ' + 
        			            airportCodes.getCityFromCode(fromCity) + 
        			             ' to <break time="0.1s"/> ' + airportCodes.getCityFromCode(toCity) + ' ';  
                        } 
                        if(i==1){
                          speechText = speechText + ' This is a connecting flight from <break time="0.1s"/>' + 
                          airportCodes.getCityFromCode(fromCity) + '<break time="0.1s"/> to <break time="0.1s"/> ' +
                          airportCodes.getCityFromCode(toCity) + ' with expected departure time of <break time="0.1s"/>'
                          + etdTime +  ' and expected arrival time of <break time="0.1s"/>' +  etaTime;
                        }
                        
		       	  	  }
	       	  	}
       	  	}
            resolve(speechText);
          });
       })
       .catch(function(err){
       	  console.log(err);
          var noOutpurText = "Sorry. We are not able to find any flight for your request <break time='0.5s'/> " + noResponseOutput;
          reject(noOutpurText);
       });
   });
}


module.exports.earliestFlights = function(myFlightDate, fromCity, toCity){

    var flightArray = [];

  var options = {
      method: 'GET',
      uri: config.serverConfig.flightSearchInfo,
      qs: {
          apikey : "vEJPhLDdNWm592lhCXwyv8sGL0K3btC9",
          origin: fromCity,
          destination: toCity,
          departure_date : myFlightDate,
          currency:"INR",
          include_airlines:"UK",
          exclude_airlines:"AI,9W"
      },
      json:true
   };

   console.log(options);

   var speechText = " ";
   var noOutpurText = "Sorry. We are not able to find any flight for your request <break time='0.5s'/> " + noResponseOutput;

   return new Promise(function(resolve, reject){
       request(options)
       .then(function(response){

           console.log(response);

  
           var results = response.results;
           for(var i=0; i<results.length; i++){
             for(var j=0;j< results[i].itineraries.length;j++){

              for(var k=0;k < results[i].itineraries[j].outbound.flights.length;k++){

                  var flightObj = {
                    "departTime":"",
                    "arriveTime":"",
                    "duratime":"",
                    "totalFare":"",
                    "tClass":"",
                    "aTerminal":"",
                    "bTerminal":"",
                    "seatsRemainig":"",
                   }

                  flightObj.departTime = results[i].itineraries[j].outbound.flights[k].departs_at;

                  flightObj.arriveTime=results[i].itineraries[j].outbound.flights[k].arrives_at;

                  flightObj.duratime= getTimeDuration(flightObj.departTime,flightObj.arriveTime);

                  if(results[i].fare.hasOwnProperty('total_price'))
                    flightObj.totalFare=results[i].fare.total_price;

                  if(results[i].itineraries[j].outbound.flights[k].booking_info.hasOwnProperty('travel_class'))
                      flightObj.tClass=results[i].itineraries[j].outbound.flights[k].booking_info.travel_class;


                  if(results[i].itineraries[j].outbound.flights[k].origin.hasOwnProperty('terminal'))
                      flightObj.aTerminal=results[i].itineraries[j].outbound.flights[k].origin.terminal;

                  if(results[i].itineraries[j].outbound.flights[k].destination.hasOwnProperty('terminal'))
                      flightObj.bTerminal=results[i].itineraries[j].outbound.flights[k].destination.terminal;
                  
                  if(results[i].itineraries[j].outbound.flights[k].booking_info.hasOwnProperty('seats_remaining'))
                    flightObj.seatsRemainig=results[i].itineraries[j].outbound.flights[k].booking_info.seats_remaining;

                  flightArray.push(flightObj);
              }
             }
           }

          
           console.log(flightArray);
    
           if(flightArray.length>0){

              var smallestKey=0;
              var startDate = new Date(flightArray[0].departTime);
              var minValue = startDate.getTime();

              for(var k = 0 ; k< flightArray.length; k++){
                 var startDate = new Date(flightArray[k].departTime);
                 if(startDate.getTime() < minValue){
                   minValue = flightArray[k].departTime.getTime();
                   smallestKey=k;
                 }
              }

              console.log(smallestKey);

              speechText ='The earliest Flight from <break time="0.1s"/> ' +  airportCodes.getCityFromCode(fromCity) + 
              ' to <break time="0.1s"/> ' + airportCodes.getCityFromCode(toCity) + '<break time="0.1s"/> on<break time="0.1s"/> '+ myFlightDate +
              ' <break time="0.1s"/> is for Rs'+ flightArray[smallestKey].totalFare + ". The Flight will depart at " + getCorrectTime((flightArray[smallestKey].departTime).split("T")[1]) +
              '<break time="0.1s"/> and will take <break time="0.2s"/>' + flightArray[smallestKey].duratime + 'to reach your destination.<break time="0.5s"/>'

           }else{
               speechText = noOutpurText;
           }

           resolve(speechText);
       })
       .catch(function(err){
          console.log(err);
          reject(errorResponse);
       });
   });

  
}


module.exports.cheapestFlights = function(myFlightDate, fromCity, toCity){

    var flightArray = [];

  var options = {
      method: 'GET',
      uri: config.serverConfig.flightSearchInfo,
      qs: {
          apikey : "vEJPhLDdNWm592lhCXwyv8sGL0K3btC9",
          origin: fromCity,
          destination: toCity,
          departure_date : myFlightDate,
          currency:"INR",
          include_airlines:"UK",
          exclude_airlines:"AI,9W"
      },
      json:true
   };

   console.log(options);

   var speechText = " ";
   var noOutpurText = "Sorry. We are not able to find any flight for your request <break time='0.5s'/> " + noResponseOutput;

   return new Promise(function(resolve, reject){
       request(options)
       .then(function(response){

           console.log(response);  
           var results = response.results;
           for(var i=0; i<results.length; i++){
             for(var j=0;j< results[i].itineraries.length;j++){

              for(var k=0;k < results[i].itineraries[j].outbound.flights.length;k++){

                  var flightObj = {
                    "departTime":"",
                    "arriveTime":"",
                    "duratime":"",
                    "totalFare":"",
                    "tClass":"",
                    "aTerminal":"",
                    "bTerminal":"",
                    "seatsRemainig":"",
                   }

                  flightObj.departTime = results[i].itineraries[j].outbound.flights[k].departs_at;

                  flightObj.arriveTime=results[i].itineraries[j].outbound.flights[k].arrives_at;

                  flightObj.duratime= getTimeDuration(flightObj.departTime,flightObj.arriveTime);

                  if(results[i].fare.hasOwnProperty('total_price'))
                    flightObj.totalFare=results[i].fare.total_price;

                  if(results[i].itineraries[j].outbound.flights[k].booking_info.hasOwnProperty('travel_class'))
                      flightObj.tClass=results[i].itineraries[j].outbound.flights[k].booking_info.travel_class;


                  if(results[i].itineraries[j].outbound.flights[k].origin.hasOwnProperty('terminal'))
                      flightObj.aTerminal=results[i].itineraries[j].outbound.flights[k].origin.terminal;

                  if(results[i].itineraries[j].outbound.flights[k].destination.hasOwnProperty('terminal'))
                      flightObj.bTerminal=results[i].itineraries[j].outbound.flights[k].destination.terminal;
                  
                  if(results[i].itineraries[j].outbound.flights[k].booking_info.hasOwnProperty('seats_remaining'))
                    flightObj.seatsRemainig=results[i].itineraries[j].outbound.flights[k].booking_info.seats_remaining;

                  flightArray.push(flightObj);
              }
             }
           }

          
           console.log(flightArray);
    
           if(flightArray.length>0){

              var smallestKey=0;
              var minValue = flightArray[0].totalFare;


              for(var k = 0 ; k < flightArray.length; k++){
                 if(flightArray[k].totalFare < minValue){
                   minValue = flightArray[k].totalFare;
                   smallestKey=k;
                 }
              }

              smallestKey=0;

              speechText ='The cheapest Flight from <break time="0.1s"/> ' +  airportCodes.getCityFromCode(fromCity) + 
              ' to <break time="0.1s"/> ' + airportCodes.getCityFromCode(toCity) + '<break time="0.1s"/> on<break time="0.1s"/> '+ myFlightDate +
              ' <break time="0.1s"/> is for Rs'+ flightArray[smallestKey].totalFare + ". The Flight will depart at " + getCorrectTime((flightArray[smallestKey].departTime).split("T")[1]) +
              '<break time="0.1s"/> and will take <break time="0.2s"/>' + flightArray[smallestKey].duratime + 'to reach your destination.'

           }else{
               speechText = noOutpurText;
           }

           resolve(speechText);
       })
       .catch(function(err){
          console.log(err);
          reject(errorResponse);
       });
   });

  
}

var fCity,tCity,mDate;

module.exports.alternateFlights = function(myFlightDate, fromCity, toCity){

  var flightArray = [];

  var options = {
      method: 'GET',
      uri: config.serverConfig.flightSearchInfo,
      qs: {
          apikey : "vEJPhLDdNWm592lhCXwyv8sGL0K3btC9",
          origin: fromCity,
          destination: toCity,
          departure_date : myFlightDate,
          currency:"INR",
          include_airlines:"UK",
          exclude_airlines:"AI,9W",
          number_of_results:5

      },
      json:true
   };

   console.log(options);

   var speechText = " ";
   var noOutpurText = "Sorry. We are not able to find any flight for your request <break time='0.5s'/> " + noResponseOutput;

   return new Promise(function(resolve, reject){
       request(options)
       .then(function(response){

           console.log(response);

           var results = response.results;
           for(var i=0; i<results.length; i++){
             for(var j=0;j< results[i].itineraries.length;j++){

              for(var k=0;k < results[i].itineraries[j].outbound.flights.length;k++){

                  var flightObj = {
                    "departTime":"",
                    "arriveTime":"",
                    "duratime":"",
                    "totalFare":"",
                    "tClass":"",
                    "aTerminal":"",
                    "bTerminal":"",
                    "seatsRemainig":"",
                   }

                  flightObj.departTime = results[i].itineraries[j].outbound.flights[k].departs_at;

                  flightObj.arriveTime=results[i].itineraries[j].outbound.flights[k].arrives_at;

                  flightObj.duratime= getTimeDuration(flightObj.departTime,flightObj.arriveTime);

                  if(results[i].fare.hasOwnProperty('total_price'))
                    flightObj.totalFare=results[i].fare.total_price;

                  if(results[i].itineraries[j].outbound.flights[k].booking_info.hasOwnProperty('travel_class'))
                      flightObj.tClass=results[i].itineraries[j].outbound.flights[k].booking_info.travel_class;


                  if(results[i].itineraries[j].outbound.flights[k].origin.hasOwnProperty('terminal'))
                      flightObj.aTerminal=results[i].itineraries[j].outbound.flights[k].origin.terminal;

                  if(results[i].itineraries[j].outbound.flights[k].destination.hasOwnProperty('terminal'))
                      flightObj.bTerminal=results[i].itineraries[j].outbound.flights[k].destination.terminal;
                  
                  if(results[i].itineraries[j].outbound.flights[k].booking_info.hasOwnProperty('seats_remaining'))
                    flightObj.seatsRemainig=results[i].itineraries[j].outbound.flights[k].booking_info.seats_remaining;

                  flightArray.push(flightObj);
              }
             }
           }

           console.log(flightArray);
    
           if(flightArray.length>0){

               speechText = 'The alternative flight from <break time="0.1s"/> ' +  airportCodes.getCityFromCode(fromCity) + 
               ' to <break time="0.1s"/> ' + airportCodes.getCityFromCode(toCity) + '<break time="0.1s"/> on<break time="0.1s"/> '+ myFlightDate +
               ' <break time="0.1s"/> is for Rs'+ flightArray[0].totalFare + ". The Flight will depart at " + getCorrectTime((flightArray[0].departTime).split("T")[1]) +
               '<break time="0.1s"/> and will take <break time="0.2s"/>' + flightArray[0].duratime + 'to reach your destination.'
               
               if(flightArray.length>1){
                speechText = 'The alternative Flight from <break time="0.1s"/> ' +  airportCodes.getCityFromCode(fromCity) + 
               ' to <break time="0.1s"/> ' + airportCodes.getCityFromCode(toCity) + '<break time="0.1s"/> on<break time="0.1s"/> '+ myFlightDate +
               ' <break time="0.1s"/> is for Rs'+ flightArray[1].totalFare + ". The Flight will depart at " + getCorrectTime((flightArray[1].departTime).split("T")[1]) + 
               '<break time="0.1s"/> and will take <break time="0.2s"/>' + flightArray[1].duratime + 'to reach your destination.'
               }

              // if(flightArray.length>2){
              //   speechText = 'The alternative Flight from <break time="0.1s"/> ' +  airportCodes.getCityFromCode(fromCity) + 
              //  ' to <break time="0.1s"/> ' + airportCodes.getCityFromCode(toCity) + '<break time="0.1s"/> on<break time="0.1s"/> '+ myFlightDate +
              //  ' <break time="0.1s"/> is for Rs'+ flightArray[2].totalFare + ". The Flight will depart at " + getCorrectTime((flightArray[2].departTime).split("T")[1]) + 
              //  '<break time="0.1s"/> and will take <break time="0.2s"/>' + flightArray[2].duratime + 'to reach your destination.<break time="0.3s"/>'
              //  }

              //  if(flightArray.length>3){
              //   speechText = 'The alternative Flight from <break time="0.1s"/> ' +  airportCodes.getCityFromCode(fromCity) + 
              //  ' to <break time="0.1s"/> ' + airportCodes.getCityFromCode(toCity) + '<break time="0.1s"/> on<break time="0.1s"/> '+ myFlightDate +
              //  ' <break time="0.1s"/> is for Rs'+ flightArray[3].totalFare + ". The Flight will depart at " + getCorrectTime((flightArray[3].departTime).split("T")[1]) + 
              //  '<break time="0.1s"/> and will take <break time="0.2s"/>' + flightArray[3].duratime + 'to reach your destination.<break time="0.3s"/>'
              //  }

           }else{
               speechText = noOutpurText;
           }

           resolve(speechText);
       })
       .catch(function(err){
          console.log(err);
          reject(errorResponse);
       });
   });
  

}


module.exports.flightDelayStatus = function(flightNumber, myFlightDate, fromCity, toCity){
  var options = {
  	method: 'GET',
    uri: config.serverConfig.vistaaraBaseUrl,
    qs: {
        FlightDate: myFlightDate,
        FlightNo: flightNumber,
        TailNo: null,
        FromCity: fromCity,
        ToCity: toCity
    }
   };

   return new Promise(function(resolve, reject){
   	   var speechText = "There is no delay in your flight";
       request(options)
       .then(function(response){

       	  to_json(response, function (error, data) {
       	  	  //console.log(JSON.stringify(data));
              if(!checkIfTableExists(data.ArrayOfTable)){
                  speechText = 'There are no Flights Available for <break time="0.3s"/>' + flightNumber +
                  ' on <break time="0.3s"/>' + myFlightDate;
              }else{

              	  if(checkIfOneRowExists(data.ArrayOfTable.Table,'FlightDetails')){

              	  	 var arrivalTime = (data.ArrayOfTable.Table.FlightDetails.FlightDetail.ETA).split(" ");
	       	  	  	 var eta = arrivalTime[0] + ' ' + arrivalTime[1] + ' ' + arrivalTime[2] + ' <break time="0.3s"/> ' + 
	       	  	  	 getCorrectTime(getCorrectTime(arrivalTime[3]));
	       	  	  	 var departTime = (data.ArrayOfTable.Table.FlightDetails.FlightDetail.ETD).split(" ");
	       	  	  	 var etd = departTime[0] + ' ' + departTime[1] + ' ' + departTime[2] + ' <break time="0.5s"/>' +
	       	  	  	 getCorrectTime(getCorrectTime(departTime[3]));
	       	  	  	 var toCity = data.ArrayOfTable.Table.FlightDetails.FlightDetail.ArrStation;
	       	  	  	 var fromCity = data.ArrayOfTable.Table.FlightDetails.FlightDetail.DepStation;
	                 speechText = 'There is no delay in your flight with flight number <break time="0.1s"/><say-as interpret-as="spell-out">' 
	                 + flightNumber + '</say-as>';

              	  }
       	  	}
            resolve(speechText);
          });
       })
       .catch(function(err){
       	  console.log(err);
          reject("Server is not responding. Please try after some time");
       });
   });
}


module.exports.adhaarBook = function(mobileNumber,mymessage){

  var options = {
    method: 'GET',
    uri: 'https://api.textlocal.in/send/',
    qs: {
        numbers: mobileNumber,
        sender: 'TXTLCL',
        message: mymessage,
        apikey: 'EMpJZ7fKX5k-p5YUh4uOH7gBGo3gpIqqri0leaQXZt',
        json: true
    }
   };

   return new Promise(function(resolve, reject){
       var speechText = " ";
       request(options)
       .then(function(response){
          resolve(response)
       })
       .catch(function(err){
          console.log(err);
          reject("Server is not responding. Please try after some time");
       });
   });
}


module.exports.weatherCityId = function(myCity){

	var options = {
	  	method: 'GET',
	    uri: config.serverConfig.locationSearch,
	    qs: {
	        query: myCity,
	    },
	    json:true
   };

   return new Promise(function(resolve, reject){
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

module.exports.weatherInfo = function(weatherID){

	var options = {
	  	method: 'GET',
	    uri: config.serverConfig.weatherInfo + weatherID + '/',
	    json:true
   };

   return new Promise(function(resolve, reject){
   	   var speechText = '';
       request(options)
       .then(function(response){
       	   if(response.hasOwnProperty('consolidated_weather')){
       	   	  var weatherState = response.consolidated_weather[0].weather_state_name;
       	   	  var minTemp = Math.round(response.consolidated_weather[0].min_temp) + '<break time="0.1s"/> degree celsius'; 
       	   	  var maxTemp = Math.round(response.consolidated_weather[0].max_temp) + '<break time="0.1s"/> degree celsius'; 

              speechText = 'The weather state is <break time="0.2s"/>' + weatherState + '<break time="0.1s"/> with '+
              'minimum temperature of <break time="0.1s"/> '+ minTemp + '<break time="0.1s"/> and maximum temperature of '+
              '<break time="0.1s"/> ' + maxTemp;
       	   } 
           resolve(speechText);       
       })
       .catch(function(err){
       	  console.log(err);
          reject("Server is not responding. Please try after some time");
       });
   });

}


module.exports.locationInformation = function(myCity){

  var locationArray = [];
  var searchText = "tourist places in " + myCity;

  var options = {
      method: 'GET',
      uri: config.serverConfig.locationInformation,
      qs: {
          key : "AIzaSyBFjdAII9GOOPzel2PKuEYwMTfP996AKJs",
          query: searchText
      },
      json:true
   };

   console.log(options);

   var speechText = "Some of famous places to visit in <break time='0.2s'/> " + myCity + " are <break time='0.4s'/> " + " ";
   var noOutpurText = "Sorry. We are not able to find any location Information for your request <break time='0.4s'/> " + noResponseOutput;
   var totalLength=0;
   
   return new Promise(function(resolve, reject){
       request(options)
       .then(function(response){

           console.log(response);
           console.log(locationArray);
           totalLengt = response.results.length;

           if(response.results.length > 3){
             totalLength = 3;
             for(var i = 0 ; i < totalLength; i++){

              if(i==totalLength-1){
                speechText = speechText + response.results[i].name
              }else{
               speechText = speechText + response.results[i].name + "<break time='0.8s'/> " ;
              }


             }
           }else if(response.results.length <= 3 && response.results.length > 0){
               totalLength = response.results.length;
               for(var i = 0 ; i < totalLength; i++){

                 if(i==totalLength-1){
                      speechText = speechText + response.results[i].name
                 }else{
                      speechText = speechText + response.results[i].name + "<break time='0.8s'/> " ;
                 }

               }
           }else{
                speechText = noOutpurText;
           }
  
           resolve(speechText);
       })
       .catch(function(err){
          console.log(err);
          reject(noOutpurText);
       });
   });

}

module.exports.searchFlightAlternate = function(fromCity,toCity,onDate){

    var requestPayLoad = {
      "source":fromCity,
      "destination":toCity,
      "date":onDate
    }

{'myFlightFare': u'4824', 'departureTime': u'06:00', 'arrivalTime': u'08:05'}

    var options = {
        method: 'POST',
        uri: config.serverConfig.searchFlightAlternate,
        body: requestPayLoad
        json: true // Automatically stringifies the body to JSON
    };

    var speechText=" "

    return new Promise(function(resolve, reject){
       request(options)
       .then(function(response){
           var durationTime = getTimeDuration(flightObj.departTime,flightObj.arriveTime);
           speechText = speechText + 'The Best Flight from <break time="0.1s"/> ' +  airportCodes.getCityFromCode(fromCity) + 
               ' to <break time="0.1s"/> ' + airportCodes.getCityFromCode(toCity) + '<break time="0.1s"/> on<break time="0.1s"/> '+ myDate +
               ' <break time="0.1s"/> is for Rs'+ response.myFlightFare + ". The Flight will depart at " + getCorrectTime(response.departureTime) +
               '<break time="0.1s"/> and will take <break time="0.2s"/>' + durationTime + 'to reach your destination.'
           resolve(speechText);
       })
       .catch(function(err){
          console.log(err);
          reject(noOutpurText);
       });
   });
}

module.exports.getMyTerminalInfo = function(originCity){
     var speechText = " ";
     var tCode = airportCodes.getTerminalFromCity(originCity);
     if(tCode == "false"){
       speechText = 'There is No Terminal for this city';
     }else{
       speechText = 'Your Terminal is <break time="0.5s"/>' + tCode;
     }
     return speechText;
  }

  var checkIfTableExists = function(arrayofTable){
    return arrayofTable.hasOwnProperty('Table');
  }

  var checkIfOneRowExists = function(myTabel, myproperty){
    return myTabel.hasOwnProperty(myproperty);
  }


  var countRows = function count(obj) {
     var count=0;
     for(var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
           ++count;
        }
     }
     return count;
  }




