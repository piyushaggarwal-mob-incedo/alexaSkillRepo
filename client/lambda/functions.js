'use strict';

var functions = require('./functions');
const Alexa = require("alexa-sdk");
var airportCodes = require('./airport-codes');

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    console.log(event);
    console.log(JSON.stringify(event));
    alexa.execute();
};

var repromptText = "What else can I help with";
var exitMessage = 'Thanks You For Using Vistara.<break time="0.2s"/> Look Forward to see you again <break time="0.2s"/>.';
var helpMessage = "Vistara can help you with checking <break time='0.1s'/> the flight status and finding the cheapest, alternate and most affordable flights to " + 
"most of the destinations all over India. You can also know about <break time='0.1s'/> club vistara, baggage allowance, terminal info, weather info and destination city "+ 
"information and tourist attraction."

const handlers = {
    'LaunchRequest': function () {
        var VistaaraWelcome = 'Namaste . Vistara mein aapka Swaagat Hain .<break time="0.5s"/> Vistaara is All About Flights';
        this.response.speak(VistaaraWelcome).listen(repromptText);
        this.emit(':responseReady');

    },
    'testdate':function(){

        this.response.speak(this.event.request.intent.slots.yourdate.value).listen(repromptText);
        this.emit(':responseReady');

    },

    'SearchFlights': function () {

        console.log("Search My Flights")   
        var myContext = this;
        if (this.event.request.dialogState === 'STARTED') {
            let updatedIntent = this.event.request.intent;
            console.log("SearchFlights STARTED");
            this.emit(':delegate', updatedIntent);
        } else if (this.event.request.dialogState !== 'COMPLETED'){
            console.log("SearchFlights IN_PROGRESS");
            this.emit(':delegate');
        } else {

            console.log("SearchFlights COMPLETED");

            var myFlightDate = this.event.request.intent.slots.mydate.value;
            var fromCity=airportCodes.getCodeFromCity(this.event.request.intent.slots.fromCity.value);
            var toCity= airportCodes.getCodeFromCity(this.event.request.intent.slots.toCity.value);

            console.log("SearchFlights" + fromCity + '/'+ toCity + '/'  + '/' + myFlightDate);

            functions.searchMyFlights(fromCity, toCity, myFlightDate)
            .then(function(result){
              myContext.response.speak(result).listen(repromptText);
              myContext.emit(':responseReady');
            }).catch(function(error){
              myContext.response.speak(error).listen(repromptText);
              myContext.emit(':responseReady'); 
            });

        }

    },
    'cityInformation': function(){
        var myContext=this;

         if (this.event.request.dialogState === 'STARTED') {
            let updatedIntent = this.event.request.intent;
            console.log("cityInformation STARTED");
            this.emit(':delegate', updatedIntent);
        } else if (this.event.request.dialogState !== 'COMPLETED'){
            console.log("SearchFlights IN_PROGRESS");
            this.emit(':delegate');
        } else {

            console.log("cityInformation COMPLETED");

            var toCity= this.event.request.intent.slots.mycity.value;
            console.log("cityInformation" + toCity);

            functions.locationInformation(toCity)
            .then(function(result){
              myContext.response.speak(result).listen(repromptText);
              myContext.emit(':responseReady');
            }).catch(function(error){
              myContext.response.speak(error).listen(repromptText);
              myContext.emit(':responseReady'); 
            });

        }

    },
    'ClubVistara': function () {
        //0 for Club Vistara
        this.attributes['endedSessionCount']=0;
        var myContext=this;
        var speechOutput = "The All New Club Vistara is The Fastest Rewarding Frequent Flyer Program. " + 
        "This program has been crafted to elevate your flying experience with Vistara, while keeping in " +
        "mind your priorities, preferences and suggestions. You can know more about Club Vistara Tiers and Privileges or "
        + "<break time='0.2s'/> Enrol for Club Vistara. What would you like to do?";
        
        this.response.speak(speechOutput).listen(repromptText);
        this.emit(':responseReady'); 

    },
    'ClubVistaraTier': function(){
        var myContext=this;
        var speechOutput = "Club Vistara tiers and privileges are designed to enhance your flying experience with us. " +
        "Our tiers  Club Vistara Base, Club Vistara Silver, Club Vistara Gold and Club Vistara Platinum <break time='0.1s'/> take " + 
        "you towards higher earn and access to exclusive privileges" + " and benefits like Priority Boarding, Priority Baggage Handling  " +
        "and Lounge Access."
        speechOutput = speechOutput + " <break time='0.1s'/>Which tier would you like to know more about. Base <break time='0.1s'/>, Silver, <break time='0.1s'/>gold or <break time='0.1s'/>Platinum?"
        myContext.response.speak(speechOutput).listen(repromptText);
        myContext.emit(':responseReady'); 
    },
    'enrollClubVistara' : function(){
        var myContext=this;
        var speechOutput = "We have sent details of enrollment process in your Vistara companion app. For more information visit clubvistara.com ";
        myContext.response.speak(speechOutput).listen(repromptText);
        myContext.emit(':responseReady'); 
    },
    'myTypeClub' : function(){

        var myContext=this;

        var speechOutput = " ";

        var clubType = this.event.request.intent.slots.myClubType.value;

        if(clubType == "base"){
          speechOutput = "Club Vistara Base is the entry level, where you earn 8 Club Vistara points for every INR 100 spent. You require 15000 Tier Points or 20 flights to upgrade to the next tier <break time='0.2s'/> Club Vistara Silver. Would you like to know more about baggage allowance or club Vistara? You can say Club Vistara or  Baggage Allowance.";
        }
        if(clubType == "platinum"){
          speechOutput = "Club Vistara Platinum is the top tier where you earn  11 Club Vistara points for every INR 100 spent and privileges like additional 15kg baggage allowance,  Lounge access, no rescheduling fee,  5 upgrade vouchers and 4 lounge vouchers. You require 35000 Tier Points or 40 flights in a 12 month period to become  a  Club Vistara Platinum member. Would you like to know more  about baggage allowance or club Vistara? You can say Club Vistara or Baggage Allowance.";

        }
        if(clubType == "gold"){
          speechOutput = "Club Vistara  Gold is the next upgraded tier from Club Vistara Silver where you earn  10 Club Vistara points for every INR 100 spent and privileges like additional 10kg baggage allowance, Lounge access, 3 upgrade vouchers and 2 lounge vouchers. You require 25000 Tier Points or 30 flights in a 12 month period to become a Club Vistara Gold member. Would you like to know more  about baggage allowance or club Vistara? You can say Club Vistara or Baggage Allowance.";

        }
        if(clubType == "silver"){
          speechOutput = "Club Vistara Silver is the next upgraded tier from Club Vistara Base where you earn  9 Club Vistara points for every INR 100 spent and privileges like additional 5kg baggage allowance, 1 upgrade voucher and 1 lounge voucher. You require 15000 Tier Points or 20 flights in a 12 month period to become a Club Vistara Silver member. Would you like to know more about baggage allowance or club Vistara? You can say Club Vistara or Baggage Allowance.";
        }

        myContext.response.speak(speechOutput).listen(repromptText);
        myContext.emit(':responseReady'); 
      
    },
    'BaggageAllowance':function(){
        var myContext=this;
        var speechOutput = "Which type of Baggage allowance you want to know more about? <break time='0.2s'/> Hand and Check-In baggage or <break time='0.2s'/> Excess baggage.";
        myContext.response.speak(speechOutput).listen(repromptText);
        myContext.emit(':responseReady'); 
    },
    'baggagetype': function(){
        var myContext=this;
        var speechOutput = "Which cabin class would you want to know the baggage allowance for <break time='0.2s'/> Economy, <break time='0.2s'/> Premium Economy or <break time='0.2s'/> Business?";
        myContext.response.speak(speechOutput).listen(repromptText);
        myContext.emit(':responseReady'); 
    },
    'excessBaggage': function(){
        var myContext=this;
        var speechOutput = "Excess Baggage is chargeable at the airport. You can also pre purchase Extra Baggage at discounted rates. To know more, please visit www.airvistara.com";
        myContext.response.speak(speechOutput).listen(repromptText);
        myContext.emit(':responseReady');
    },
    'economy': function(){
        var myContext=this;
        var speechOutput = "Check in baggage allowance for economy Class is 15 kgs. Hand baggage should not weigh more than 7kg and an additional item such as a handbag or a laptop bag might be allowed as well. Economy class customers can also enjoy additional 5kg cabin baggage allowance with <break time='0.1s'/> Vistara Carry on Plus. To know more, please visit www.airvistara.com";
        myContext.response.speak(speechOutput).listen(repromptText);
        myContext.emit(':responseReady'); 
    },
     'premium': function(){
        var myContext=this;
        var speechOutput = "Check in baggage allowance for premium economy Class is 20kgs. Hand baggage should not weigh more than 7 kg and an additional item such as a handbag or a laptop bag might be allowed as well. You can also pre purchase Extra Baggage at discounted rates. To know more, please visit www.airvistara.com";
        myContext.response.speak(speechOutput).listen(repromptText);
        myContext.emit(':responseReady'); 
    },
     'business': function(){
        var myContext=this;
        var speechOutput = "Check in baggage allowance for Business Class is 30 kgs. Hand baggage should not weigh more than 7kg and an additional item such as a handbag or a laptop bag might be allowed as well. You can also pre purchase Extra Baggage at discounted rates. To know more, please visit www.airvistara.com";
        myContext.response.speak(speechOutput).listen(repromptText);
        myContext.emit(':responseReady'); 
    },

    'FlightStatus': function () {
        console.log("FlightStatus");
        var myContext = this;
        if (this.event.request.dialogState === 'STARTED') {
            let updatedIntent = this.event.request.intent;
            console.log("FlightStatus STARTED");
            this.emit(':delegate', updatedIntent);
        } else if (this.event.request.dialogState !== 'COMPLETED'){
            console.log("FlightStatus IN_PROGRESS");
            this.emit(':delegate');
        } else {
            console.log("FlightStatus COMPLETED");
            var myFlightNumber = (this.event.request.intent.slots.flightnum.value).replace(/\s/g, "") ;
            var myFlightNumber = (this.event.request.intent.slots.flightnum.value).replace(/\s/g, "") ;


            var myFlightDate = this.event.request.intent.slots.flightdate.value;
            var fromCity=null,toCity=null;

            if((this.event.request.intent.slots.fromCity).hasOwnProperty('value') && 
                (this.event.request.intent.slots.toCity).hasOwnProperty('value')){
              fromCity = this.event.request.intent.slots.fromCity.value;
              fromCity = airportCodes.getCodeFromCity(fromCity);
              toCity = this.event.request.intent.slots.toCity.value;
              toCity = airportCodes.getCodeFromCity(toCity);
            }

            console.log("FlightStatus" + fromCity + '/'+ toCity + '/' + myFlightNumber + '/' + myFlightDate);
            myFlightNumber = "UK"+myFlightNumber;
            console.log("FlightStatus" + fromCity + '/'+ toCity + '/' + myFlightNumber + '/' + myFlightDate);

            functions.getFlightStatus(myFlightNumber, myFlightDate, fromCity, toCity).
            then(function(result){
              myContext.response.speak(result).listen(repromptText);
              myContext.emit(':responseReady');
            }).catch(function(error){
              myContext.response.speak(error).listen(repromptText);
              myContext.emit(':responseReady'); 
            });
        }
    },
    'CheapestFlights': function () {

        console.log("CheapestFlights");
        var myContext = this;

        if (this.event.request.dialogState === 'STARTED') {
            let updatedIntent = this.event.request.intent;
            console.log("EarliestFlights STARTED");
            this.emit(':delegate', updatedIntent);
        } else if (this.event.request.dialogState !== 'COMPLETED'){
            console.log("EarliestFlights IN_PROGRESS");
            this.emit(':delegate');
        } else {
            console.log("EarliestFlights COMPLETED");


            var myFlightDate = this.event.request.intent.slots.cheapdate.value;
            var fromCity=airportCodes.getCodeFromCity(this.event.request.intent.slots.fromCity.value);
            var toCity= airportCodes.getCodeFromCity(this.event.request.intent.slots.toCity.value);
            
            myContext.attributes['myFromCity'] = fromCity;
            myContext.attributes['myToCity'] = toCity;
            myContext.attributes['myDate'] = myFlightDate;

            console.log(fromCity + 'to' + toCity + 'on '+ myFlightDate);

  

            functions.cheapestFlights(myFlightDate, fromCity, toCity).
                then(function(result){
                  myContext.response.speak(result).listen(repromptText);
                  myContext.emit(':responseReady');
                }).catch(function(error){
                  myContext.response.speak(error).listen(repromptText);
                  myContext.emit(':responseReady'); 
            });


            // if(myFlightType == "early" || myFlightType == "earliest"){

            //     functions.earliestFlights(myFlightDate, fromCity, toCity).
            //       then(function(result){
            //         myContext.response.speak(result).listen(repromptText);
            //         myContext.emit(':responseReady');
            //       }).catch(function(error){
            //         myContext.response.speak(error).listen(repromptText);
            //         myContext.emit(':responseReady'); 
            //       });

            // }

            // if(myFlightType == "cheap" || myFlightType == "cheapest"){

            //     functions.cheapestFlights(myFlightDate, fromCity, toCity).
            //     then(function(result){
            //       myContext.response.speak(result).listen(repromptText);
            //       myContext.emit(':responseReady');
            //     }).catch(function(error){
            //       myContext.response.speak(error).listen(repromptText);
            //       myContext.emit(':responseReady'); 
            //     });

            // }

           
        }
    },
     'AlternateFlights': function () {
        console.log("AlternateFlights");
        var myContext = this;
        if (this.event.request.dialogState === 'STARTED') {
            let updatedIntent = this.event.request.intent;
            console.log("AlternateFlights STARTED");
            this.emit(':delegate', updatedIntent);
        } else if (this.event.request.dialogState !== 'COMPLETED'){
            console.log("AlternateFlights IN_PROGRESS");
            this.emit(':delegate');
        } else {
            console.log("AlternateFlights COMPLETED");

            var myFlightDate = this.event.request.intent.slots.mdate.value;
            var fromCity= airportCodes.getCodeFromCity(this.event.request.intent.slots.fromCity.value);
            var toCity=  airportCodes.getCodeFromCity(this.event.request.intent.slots.toCity.value);

            myContext.attributes['myFromCity'] = fromCity;
            myContext.attributes['myToCity'] = toCity;
            myContext.attributes['myDate'] = myFlightDate;

                        console.log(fromCity + 'to' + toCity + 'on '+ myFlightDate);


            functions.alternateFlights(myFlightDate, fromCity, toCity).
            then(function(result){
              myContext.response.speak(result).listen(repromptText);
              myContext.emit(':responseReady');
            }).catch(function(error){
              myContext.response.speak(error).listen(repromptText);
              myContext.emit(':responseReady'); 
            });
        }
    },
    'Weatherstatus': function () {
        console.log("Weatherstatus");
        var myContext = this;
        if (this.event.request.dialogState === 'STARTED') {
            let updatedIntent = this.event.request.intent;
            console.log("Weatherstatus STARTED");
            this.emit(':delegate', updatedIntent);
        } else if (this.event.request.dialogState !== 'COMPLETED'){
            console.log("Weatherstatus IN_PROGRESS");
            this.emit(':delegate');
        } else {
            console.log("Weatherstatus COMPLETED");

            var cityName = this.event.request.intent.slots.myCity.value;

            functions.weatherCityId(cityName).
            then(function(result){
              if(result.length == 0){
               myContext.response.speak("Not able to fetch weather. Please try after some time").listen(repromptText);
               myContext.emit(':responseReady'); 
              }else{
                return functions.weatherInfo(result[0].woeid);
              }
            }).then(function(result){
               console.log(result);
               myContext.response.speak(result).listen(repromptText);
               myContext.emit(':responseReady'); 
            }).catch(function(error){
                myContext.response.speak(error).listen(repromptText);
                myContext.emit(':responseReady'); 
            });
        }
    },
     'TerminalInfo': function () {
        console.log("Weatherstatus");
        var myContext = this;
        if (this.event.request.dialogState === 'STARTED') {
            let updatedIntent = this.event.request.intent;
            console.log("TerminalInfo STARTED");
            this.emit(':delegate', updatedIntent);
        } else if (this.event.request.dialogState !== 'COMPLETED'){
            console.log("TerminalInfo IN_PROGRESS");
            this.emit(':delegate');
        } else {
            console.log("TerminalInfo COMPLETED");
            var cityName = this.event.request.intent.slots.fromCity.value;
            myContext.response.speak(functions.getMyTerminalInfo(cityName)).listen(repromptText);
            myContext.emit(':responseReady'); 
        }
    },
    'AMAZON.HelpIntent': function () {
        this.response.speak(helpMessage).listen(repromptText);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(exitMessage);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(exitMessage);
        this.emit(':responseReady');
    },
    'Unhandled': function () {
        this.response.speak("Unable To Understand. Please try again").listen(helpMessage);
        this.emit(':responseReady');
    },
    'SessionEndedRequest': function () {
        console.log('Session ended');
    }
};


