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

    }
};


