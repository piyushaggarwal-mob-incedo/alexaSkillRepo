
var skillCreation = require("./skill-creation");
var skillUpdation = require("./skill-updation");
var oAuthLinking  = require("./oauth-linking");
var input;

var successResponse = {
	"modelUpdation" : {
		"status" : "failed",
		"message" : " ",
		"resultMsg" : " "
	}
};


var skillUpdationrequest = {
    "skill-created": "no",
    "app-id": "968e327a-4849-4c5a-98b2-aeb91a8ac540",
    "intentsList": [
        {
  "languageModel": {
    "types": [
      {
        "name": "clubType",
        "values": [
          {
            "id": "4",
            "name": {
              "value": "base",
              "synonyms": []
            }
          },
          {
            "id": "3",
            "name": {
              "value": "gold",
              "synonyms": []
            }
          },
          {
            "id": "2",
            "name": {
              "value": "silver",
              "synonyms": []
            }
          },
          {
            "id": "1",
            "name": {
              "value": "platinum",
              "synonyms": []
            }
          }
        ]
      },
      {
        "name": "mybaggagetype",
        "values": [
          {
            "id": null,
            "name": {
              "value": "hand",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "check in",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "check",
              "synonyms": []
            }
          },
          {
            "id": null,
            "name": {
              "value": "hand and check in",
              "synonyms": []
            }
          }
        ]
      }
    ],
    "intents": [
      {
        "name": "AlternateFlights",
        "samples": [
          "is there any alternate flight",
          "is there any alternate flight from {fromCity} to {toCity}",
          "alternate flight from {fromCity}",
          "alternate flights",
          "alternate flight from {fromCity} to {toCity} on {mdate}",
          "alternate flight",
          "alternate flight on {mdate}"
        ],
        "slots": [
          {
            "name": "fromCity",
            "type": "AMAZON.City",
            "samples": [
              "{fromCity}",
              "I am travelling from {fromCity}"
            ]
          },
          {
            "name": "toCity",
            "type": "AMAZON.City",
            "samples": [
              "{toCity}",
              "I am travelling to {toCity}"
            ]
          },
          {
            "name": "mdate",
            "type": "AMAZON.DATE",
            "samples": [
              "{mdate}"
            ]
          }
        ]
      },
      {
        "name": "AMAZON.CancelIntent",
        "samples": []
      },
      {
        "name": "AMAZON.HelpIntent",
        "samples": []
      },
      {
        "name": "AMAZON.PauseIntent",
        "samples": []
      },
      {
        "name": "AMAZON.ResumeIntent",
        "samples": []
      },
      {
        "name": "AMAZON.StopIntent",
        "samples": []
      },
      {
        "name": "BaggageAllowance",
        "samples": [
          "baggage allowance",
          "tell me about baggage allowance",
          "allowance"
        ],
        "slots": []
      },
      {
        "name": "baggagetype",
        "samples": [
          "{typebaggage} baggage",
          "{typebaggage}",
          "hand",
          "hand and check in"
        ],
        "slots": [
          {
            "name": "typebaggage",
            "type": "mybaggagetype"
          }
        ]
      },
      {
        "name": "business",
        "samples": [
          "business",
          "business class",
          "business cabin class"
        ],
        "slots": []
      },
      {
        "name": "CheapestFlights",
        "samples": [
          "cheapest flights",
          "suggest cheapest  flights",
          "cheapest flight on {cheapdate}",
          "Please tell cheapest  flights from {fromCity} to {toCity}",
          "what are cheapest flights from {fromCity} to {toCity} on {cheapdate}",
          "what are cheapest  flights from {fromCity}",
          "what are cheapest  flights from {fromCity} to {toCity}",
          "cheapest flights from {fromCity} to {toCity}",
          "cheapest flight from {fromCity} to {toCity}",
          "cheapest flights from {fromCity} to {toCity} on {cheapdate}",
          "cheapest flight from {fromCity} to {toCity} on {cheapdate}",
          "cheap flight from {fromCity} to {toCity}",
          "Affordable Flights",
          "Affordable flights from {fromCity}"
        ],
        "slots": [
          {
            "name": "fromCity",
            "type": "AMAZON.City",
            "samples": [
              "{fromCity}"
            ]
          },
          {
            "name": "toCity",
            "type": "AMAZON.City",
            "samples": [
              "{toCity}"
            ]
          },
          {
            "name": "cheapdate",
            "type": "AMAZON.DATE",
            "samples": [
              "{cheapdate}"
            ]
          }
        ]
      },
      {
        "name": "cityInformation",
        "samples": [
          "tell me about destination city",
          "how is my destination city",
          "places to visit in destination city",
          "famous places to visit in {mycity}",
          "famouse about {mycity}",
          "what is point of interest in {mycity}",
          "what is point of interest of destination city",
          "tell me about {mycity}",
          "what is famous about {mycity}",
          "what are the famous places to visit in {mycity}",
          "tourist attraction in {mycity}",
          "best place to visit",
          "where should in go in {mycity}",
          "what are some famous places in {mycity}",
          "location information of {mycity}",
          "information about {mycity}",
          "tell me about my destination city",
          "location information",
          "city information",
          "what is famous about destination city"
        ],
        "slots": [
          {
            "name": "mycity",
            "type": "AMAZON.City",
            "samples": [
              "{mycity}",
              "I am travelling to {mycity}"
            ]
          }
        ]
      },
      {
        "name": "ClubVistara",
        "samples": [
          "Tell be about Club Vistara",
          "what is club vistara",
          "club vistara"
        ],
        "slots": []
      },
      {
        "name": "ClubVistaraTier",
        "samples": [
          "Club Vistara Tier",
          "Tier",
          "Privileges",
          "club vistara tera"
        ],
        "slots": []
      },
      {
        "name": "economy",
        "samples": [
          "economy",
          "economy class",
          "economy cabin class"
        ],
        "slots": []
      },
      {
        "name": "enrollClubVistara",
        "samples": [
          "join club vistara",
          "enrol",
          "enroll",
          "enroll in club vistara",
          "Enrol for Club Vistara"
        ],
        "slots": []
      },
      {
        "name": "excessBaggage",
        "samples": [
          "excess baggage",
          "excess"
        ],
        "slots": []
      },
      {
        "name": "FlightStatus",
        "samples": [
          "Please check my Flight Status",
          "flight status",
          "what is my flight status",
          "flight timings",
          "what are my flight timings",
          "what are my flight timings for {fromCity} to {toCity}",
          "get the status of flight ",
          "what is the flight status of UK {flightnum}",
          "get flight status of UK  {flightnum}",
          "get my flight status of  UK {flightnum} on {flightdate}",
          "what is my flight status of flight number UK {flightnum}",
          "flight status of UK {flightnum}",
          "flight status of UK {flightnum} on {flightdate}",
          "give me my flight status",
          "please tell my flight status",
          "what is flight status of flight number UK {flightnum}",
          "tell my flight status",
          "flight status of UK {flightnum} for {flightdate}"
        ],
        "slots": [
          {
            "name": "fromCity",
            "type": "AMAZON.City"
          },
          {
            "name": "toCity",
            "type": "AMAZON.City"
          },
          {
            "name": "flightnum",
            "type": "AMAZON.NUMBER",
            "samples": [
              "{flightnum}",
              "UK {flightnum}"
            ]
          },
          {
            "name": "flightdate",
            "type": "AMAZON.DATE"
          }
        ]
      },
      {
        "name": "myTypeClub",
        "samples": [
          "{myClubType}",
          "I want to know about {myClubType}"
        ],
        "slots": [
          {
            "name": "myClubType",
            "type": "clubType"
          }
        ]
      },
      {
        "name": "premium",
        "samples": [
          "premium",
          "premium economy",
          "premium economy class"
        ],
        "slots": []
      },
      {
        "name": "SearchFlights",
        "samples": [
          "search flight from {fromCity} to {toCity}",
          "search flights",
          "search flight",
          "search flights from {fromCity} to {toCity} on {mydate}",
          "search flights on {mydate}",
          "what are flights from {fromCity} to {toCity} on {mydate}",
          "Tell me available flights from {fromCity} to {toCity} on {mydate}",
          "suggest any flight from {fromCity} to {toCity} on {mydate}",
          "suggest flights from {fromCity}",
          "search flights from {fromCity} to {toCity}",
          "search flight from {fromCity} to {toCity} on {mydate}"
        ],
        "slots": [
          {
            "name": "fromCity",
            "type": "AMAZON.City",
            "samples": [
              "{fromCity}",
              "i am planning to travel from {fromCity}",
              "i am travelling from {fromCity}"
            ]
          },
          {
            "name": "toCity",
            "type": "AMAZON.City",
            "samples": [
              "{toCity}",
              "i am planning to travel to {toCity}",
              "i am travelling to {toCity}"
            ]
          },
          {
            "name": "mydate",
            "type": "AMAZON.DATE",
            "samples": [
              "{mydate}",
              "I am planning to travel on {mydate}"
            ]
          }
        ]
      },
      {
        "name": "TerminalInfo",
        "samples": [
          "please tell my terminal",
          "what is my terminal",
          "what is my terminal of {fromCity}",
          "whats my terminal of {fromCity}",
          "terminal info",
          "terminal info of {fromCity}",
          "give me my terminal information",
          "terminal information",
          "terminal of {fromCity}"
        ],
        "slots": [
          {
            "name": "fromCity",
            "type": "AMAZON.City",
            "samples": [
              "{fromCity}",
              "from {fromCity}",
              "I am travelling from {fromCity}"
            ]
          }
        ]
      },
      {
        "name": "testdate",
        "samples": [
          "what is {yourdate}"
        ],
        "slots": [
          {
            "name": "yourdate",
            "type": "AMAZON.DATE"
          }
        ]
      },
      {
        "name": "Weatherstatus",
        "samples": [
          "how is the weather outside",
          "when I will be in flight then how would be the weather outside",
          "how will be the weather when I will be in flight",
          "how is the weather",
          "how is the weather of {myCity}",
          "what is the weather of my destination",
          "What will be the weather of destination when our flight will reach there",
          "how is the weather of my destination city"
        ],
        "slots": [
          {
            "name": "myCity",
            "type": "AMAZON.City",
            "samples": [
              "{myCity}",
              "I am travelling from {myCity}",
              "I am travelling to {myCity}"
            ]
          }
        ]
      }
    ],
    "invocationName": "daily travel"
  },
  "prompts": [
    {
      "id": "Elicit.Intent-AlternateFlights.IntentSlot-fromCity",
      "variations": [
        {
          "type": "PlainText",
          "value": "from which city you are planning to travel"
        }
      ]
    },
    {
      "id": "Elicit.Intent-AlternateFlights.IntentSlot-toCity",
      "variations": [
        {
          "type": "PlainText",
          "value": "To which city are you planning to travel"
        }
      ]
    },
    {
      "id": "Elicit.Intent-AlternateFlights.IntentSlot-mdate",
      "variations": [
        {
          "type": "PlainText",
          "value": "on which date you are travelling"
        }
      ]
    },
    {
      "id": "Elicit.Intent-CheapestFlights.IntentSlot-fromCity",
      "variations": [
        {
          "type": "PlainText",
          "value": "from which city you are travelling"
        }
      ]
    },
    {
      "id": "Elicit.Intent-CheapestFlights.IntentSlot-toCity",
      "variations": [
        {
          "type": "PlainText",
          "value": "to which city you are travelling"
        }
      ]
    },
    {
      "id": "Elicit.Intent-CheapestFlights.IntentSlot-cheapdate",
      "variations": [
        {
          "type": "PlainText",
          "value": "on which date you are planning to travel"
        }
      ]
    },
    {
      "id": "Elicit.Intent-cityInformation.IntentSlot-mycity",
      "variations": [
        {
          "type": "PlainText",
          "value": "Please tell the city name"
        },
        {
          "type": "PlainText",
          "value": "which city you are travelling to"
        }
      ]
    },
    {
      "id": "Elicit.Intent-FlightStatus.IntentSlot-flightnum",
      "variations": [
        {
          "type": "PlainText",
          "value": "Please tell your flight number"
        }
      ]
    },
    {
      "id": "Elicit.Intent-FlightStatus.IntentSlot-flightdate",
      "variations": [
        {
          "type": "PlainText",
          "value": "on which date you are travelling"
        },
        {
          "type": "PlainText",
          "value": "what is your flight date"
        }
      ]
    },
    {
      "id": "Elicit.Intent-SearchFlights.IntentSlot-fromCity",
      "variations": [
        {
          "type": "PlainText",
          "value": "From where are u travelling"
        },
        {
          "type": "PlainText",
          "value": "from where you are planning to travel"
        }
      ]
    },
    {
      "id": "Elicit.Intent-SearchFlights.IntentSlot-toCity",
      "variations": [
        {
          "type": "PlainText",
          "value": "What is your destination"
        }
      ]
    },
    {
      "id": "Elicit.Intent-SearchFlights.IntentSlot-mydate",
      "variations": [
        {
          "type": "PlainText",
          "value": "When are u planning to travel"
        }
      ]
    },
    {
      "id": "Elicit.Intent-TerminalInfo.IntentSlot-fromCity",
      "variations": [
        {
          "type": "PlainText",
          "value": "Please tell your origin city"
        },
        {
          "type": "PlainText",
          "value": "From where city you are travelling"
        },
        {
          "type": "PlainText",
          "value": "From Which city you are departing"
        }
      ]
    },
    {
      "id": "Elicit.Intent-Weatherstatus.IntentSlot-myCity",
      "variations": [
        {
          "type": "PlainText",
          "value": "Please tell the city name"
        }
      ]
    }
  ],
  "dialog": {
    "intents": [
      {
        "name": "AlternateFlights",
        "confirmationRequired": false,
        "prompts": {},
        "slots": [
          {
            "name": "fromCity",
            "type": "AMAZON.City",
            "elicitationRequired": true,
            "confirmationRequired": false,
            "prompts": {
              "elicitation": "Elicit.Intent-AlternateFlights.IntentSlot-fromCity"
            }
          },
          {
            "name": "toCity",
            "type": "AMAZON.City",
            "elicitationRequired": true,
            "confirmationRequired": false,
            "prompts": {
              "elicitation": "Elicit.Intent-AlternateFlights.IntentSlot-toCity"
            }
          },
          {
            "name": "mdate",
            "type": "AMAZON.DATE",
            "elicitationRequired": true,
            "confirmationRequired": false,
            "prompts": {
              "elicitation": "Elicit.Intent-AlternateFlights.IntentSlot-mdate"
            }
          }
        ]
      },
      {
        "name": "CheapestFlights",
        "confirmationRequired": false,
        "prompts": {},
        "slots": [
          {
            "name": "fromCity",
            "type": "AMAZON.City",
            "elicitationRequired": true,
            "confirmationRequired": false,
            "prompts": {
              "elicitation": "Elicit.Intent-CheapestFlights.IntentSlot-fromCity"
            }
          },
          {
            "name": "toCity",
            "type": "AMAZON.City",
            "elicitationRequired": true,
            "confirmationRequired": false,
            "prompts": {
              "elicitation": "Elicit.Intent-CheapestFlights.IntentSlot-toCity"
            }
          },
          {
            "name": "cheapdate",
            "type": "AMAZON.DATE",
            "elicitationRequired": true,
            "confirmationRequired": false,
            "prompts": {
              "elicitation": "Elicit.Intent-CheapestFlights.IntentSlot-cheapdate"
            }
          }
        ]
      },
      {
        "name": "cityInformation",
        "confirmationRequired": false,
        "prompts": {},
        "slots": [
          {
            "name": "mycity",
            "type": "AMAZON.City",
            "elicitationRequired": true,
            "confirmationRequired": false,
            "prompts": {
              "elicitation": "Elicit.Intent-cityInformation.IntentSlot-mycity"
            }
          }
        ]
      },
      {
        "name": "FlightStatus",
        "confirmationRequired": false,
        "prompts": {},
        "slots": [
          {
            "name": "fromCity",
            "type": "AMAZON.City",
            "elicitationRequired": false,
            "confirmationRequired": false,
            "prompts": {}
          },
          {
            "name": "toCity",
            "type": "AMAZON.City",
            "elicitationRequired": false,
            "confirmationRequired": false,
            "prompts": {}
          },
          {
            "name": "flightnum",
            "type": "AMAZON.NUMBER",
            "elicitationRequired": true,
            "confirmationRequired": false,
            "prompts": {
              "elicitation": "Elicit.Intent-FlightStatus.IntentSlot-flightnum"
            }
          },
          {
            "name": "flightdate",
            "type": "AMAZON.DATE",
            "elicitationRequired": true,
            "confirmationRequired": false,
            "prompts": {
              "elicitation": "Elicit.Intent-FlightStatus.IntentSlot-flightdate"
            }
          }
        ]
      },
      {
        "name": "SearchFlights",
        "confirmationRequired": false,
        "prompts": {},
        "slots": [
          {
            "name": "fromCity",
            "type": "AMAZON.City",
            "elicitationRequired": true,
            "confirmationRequired": false,
            "prompts": {
              "elicitation": "Elicit.Intent-SearchFlights.IntentSlot-fromCity"
            }
          },
          {
            "name": "toCity",
            "type": "AMAZON.City",
            "elicitationRequired": true,
            "confirmationRequired": false,
            "prompts": {
              "elicitation": "Elicit.Intent-SearchFlights.IntentSlot-toCity"
            }
          },
          {
            "name": "mydate",
            "type": "AMAZON.DATE",
            "elicitationRequired": true,
            "confirmationRequired": false,
            "prompts": {
              "elicitation": "Elicit.Intent-SearchFlights.IntentSlot-mydate"
            }
          }
        ]
      },
      {
        "name": "TerminalInfo",
        "confirmationRequired": false,
        "prompts": {},
        "slots": [
          {
            "name": "fromCity",
            "type": "AMAZON.City",
            "elicitationRequired": true,
            "confirmationRequired": false,
            "prompts": {
              "elicitation": "Elicit.Intent-TerminalInfo.IntentSlot-fromCity"
            }
          }
        ]
      },
      {
        "name": "Weatherstatus",
        "confirmationRequired": false,
        "prompts": {},
        "slots": [
          {
            "name": "myCity",
            "type": "AMAZON.City",
            "elicitationRequired": true,
            "confirmationRequired": false,
            "prompts": {
              "elicitation": "Elicit.Intent-Weatherstatus.IntentSlot-myCity"
            }
          }
        ]
      }
    ]
  }
}
    ],
    "accountInfo": {
        "vendorId": "M2L5M4R746DKO0",
        "skillRefreshToken": "Atzr|IwEBIG-7F6WNHRrokQuF2p6EH4fgcdQCUkmz-hE_K1Oq60Mhj4HJgYi3hsx57p71Gnsz24q_02JuXb-STtX7-8XtmElPgQhn8l7ye_WLtieR8FdDl-FNOwixYLChlsiHPG1xT5vsAUWCesTlwQBUyqqdYRsLUE8jPFldfMeu87yTen6fHiEWUiOR90APrfno87WUaDYWOw7VJH6zcinYWMBCTn1q1uir0IO4slIXesGPfqxpJdXr1ODE06VWP95N57yKRqnY6-6kXvJ2d0u70fTGCLDg7ChspqWJ4olG1bMYIXk-1Ps8CuuQRr3aOeB1H1sApC2xBxQ-P4AlJDxnTj_SR58MxBXU3F5Qwhto7jU6n-uoquRGrnAyTzF2Lah5UwMKZGiQaH0B7DNqwVE_OCC1X08v4GL3yinhJqsZYaT1v77RuAmVTK677QOkMAoped1eyP5T1w9hmFbC7QC1QhEhcFePKSB_eBo_a-KWbiEF0sR5wATXC2fL-LzoqFv21YgMg2kmvYBsIMoxXUGwP1XV-Ut05lYQ2SWmPpmsO6B6_NsFs4ou_Dx-QcCkWIdCUutL2_XKD4SHc5uugK9wwbS9LNST8O3pMX_RncftlODKfZH2QQ",
        "clientId": "amzn1.application-oa2-client.42e0b68af9e64752be7c03131da08e63",
        "clientSecret": "e347dc1fdc5154fd50bb5713e689df76960de08398a4cc88839e0980f292ab0c",
        "awsLambdaUrl": "arn:aws:lambda:us-east-1:993995185795:function:appcms"
    },
    "oauthAccountLinkingInfo": {
        "clientId": "hoichoi-test3",
        "clientSecret": "1078f58362a94ced9609f9e541310269",
        "tokenUrl": "https://fqppmaahm9.execute-api.us-east-1.amazonaws.com/release/oauth2/token",
        "authorizationUrl": "https://staging4.partners.viewlift.com/oauth"
    },
    "version": "0.29.0"
};


	


    skillCreation.getSkillCreateJson()
		.then(function(result){
			input = JSON.parse(result);
			console.log(input);
			console.log(input.accountInfo.skillRefreshToken);
			return skillCreation.getAccessToken(input.accountInfo.skillRefreshToken, input.accountInfo.clientId, input.accountInfo.clientSecret);
		})
		.then(function(result){
		  console.log(result);	
		  result = JSON.parse(result);
		  //console.log(result.access_token);
		  return skillUpdation.updateSkill(mySkillId, input ,result.access_token);
		})
		.then(function (result) {
			console.log("Model Updated Successfully");
			console.log("Success");
			successResponse.modelUpdation.status="Success";
			successResponse.modelUpdation.message = "Model Updation Done Succesfully";
			successResponse.modelUpdation.resultMsg = result;
			console.log(successResponse);
			//callback(null, successResponse);
		})
		.catch(function(error){
			successResponse.modelUpdation.status="Failed";
			successResponse.modelUpdation.message = error;
		    console.log(error);
		    //callback(null, successResponse);
		});
	
// exports.handler = (event, context, callback) => {

	

	
// };




  