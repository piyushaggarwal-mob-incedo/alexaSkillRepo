
var testFunctions = require("./appcms-test-functions");
var Excel = require("exceljs");

var mainWorkSheet;
var mySkillID;

var myArgs = process.argv.slice(2);


var myData = {
	"vendorId" : "M3ST04L000VU7J",
	"skillRefreshToken" : "Atzr|IwEBIOtIg8FKNoxqgKRvWGAUxVNsoIPl4szS-WuRuuyjibIoRS5ccV9E4XlRfKUSXtlKVUxAj-b8Z-yKmUkscPJ4oeisWP5TQ1uD38iYl6rTt0TiSMegXwPZS2xHQGGh2Jxy2b0Ar2mnQRyeyqoTRvq_cWEQL6csmg4xBHkWovtfViEemfkev-8Epy0pTmHVjhG3Ue2qe4yWe7YVKtp6Yo4VA0c41RSAyTS176gi54WeNLYgEkiKlXbAX3Cj_0nBihxP8YL9srE9K220Sz0pyBiwCFwvOxfHrMT0PQmE08LTWF73drR9t3A7rUyfk-neg09qGwJdPbirxhQOpMKxYvRi9I-3i-WqWxcMJO9AOjeMiRpd0UBYH2rrHYKfezKD14lWEi1QrKkf5o-vrowsLh0UEdAYt3sbUWO-iM5fR2-YjA1OI9SUxEMleZ_a9B36XRLxFqWaVr-AefQnqNR2ffMqt5hQt7qqiCUNDeIBZDJxkcpI17funsmDw9M6rLIYeh3eXxL606OR_5hZ4R0DI0dzexW020dyB4tb_dXLb8n0FVzyw7dQQJ1aKeZ2EdnSyIpDp9rMpTVKAfA9zXO4GDJF5iY96LZedfa63y1lF4DlVhSudg",
	"clientId" : "amzn1.application-oa2-client.c9dd36c85d7b4d5c8f51151835cecf71",
	"clientSecret" : "abee6c186cdecec5d2c7a910b1acb6b18f076f060ac620ffb74f1e3980373704",
}

var myFileName = "./testresult-" + myArgs[0].toLowerCase() + ".xlsx";

var options = {
	filename: myFileName, // existing filepath
	useStyles: true, // Default
	useSharedStrings: true // Default
};

var mainWorkBook = new Excel.stream.xlsx.WorkbookWriter(options);

mainWorkBook.addWorksheet('My Sheet', {properties:{tabColor:{argb:'FFC0000'}}});

mainWorkSheet = mainWorkBook.getWorksheet("My Sheet");

mainWorkSheet.columns = [
  { header:"Test Case", key:"test", width:45},
  { header:"Status", key:"status", width:30 },
  { header:"Execution Time (In Sec.)", key:"time", width:35},
  { header:"Error Message (if any)", key:"message", width:28},
  { header:"Response From Alexa", key:"response", width:30}
];

mainWorkSheet.eachRow(function(row, rowNumber) {
	row.eachCell(function(cell, colNumber) {
	   cell.fill = {
                      type: 'pattern',
                      pattern:'solid',
                      fgColor:{argb:'FFFFFF00'},
                      bgColor:{argb:'FF0000FF'}
                   };
	});
});



var addRowObject;
var rowLooping;
var childWorkSheet;

var workbook = new Excel.Workbook();
var readFileName = "testcase-"+myArgs[0]+".xlsx"; 
workbook.xlsx.readFile(readFileName)
    .then(function() {
		childWorkSheet = workbook.getWorksheet('Sheet1');
		console.log(" ");
		console.log("Total Test Cases to Execute -- " + childWorkSheet.actualRowCount);
		console.log(" ");
		rowLooping = childWorkSheet.actualRowCount;

        testFunctions.getAccessToken(myData.skillRefreshToken , myData.clientId, myData.clientSecret).then(function(result){
           return testFunctions.getAllSkillsFunction(result.access_token);
        }).then(function(result){

           for(var j = 0 ; j < result.skills.length; j++){
             if(result.skills[j].nameByLocale['en-US'].toLowerCase() == myArgs[0].toLowerCase()){
             	mySkillID = result.skills[j].skillId;
             }
           }
           recursiveTestPromises(childWorkSheet.actualRowCount, mySkillID);
        }).catch(function(error){
           console.log(error);
        })
});


var recursiveTestPromises = function(noTestRow, myCurrentSkillID){

    if(noTestRow == 0){
      mainWorkSheet.commit(); // Need to commit the changes to the mainWorkSheet
      mainWorkBook.commit(); // Finish the workbook
      console.log("All Test Cases Ran Succesfully");
      return 0;
    }
    var myInput = {
	  "input": {
	    "content": "open viewlift"
	  },
	  "device": {
	    "locale": "en-US"
	  }
	};

    myInput.input.content = childWorkSheet.getRow(rowLooping - noTestRow + 1).getCell(1).value;
    myInput.device.locale = "en-US";

	testFunctions.getAccessToken(myData.skillRefreshToken , myData.clientId, myData.clientSecret).
		then(function(result){
		  return testFunctions.testCasePromise(myInput, result.access_token, myCurrentSkillID);
		}).
		then(function(result){

		    console.log((rowLooping - noTestRow + 1) + '.) ' + myInput.input.content + ' --> ' +result.status);

		    if(result.status == "SUCCESSFUL"){
              
              var execTimeResult = result.result.skillExecutionInfo.metrics.skillExecutionTimeInMilliseconds/1000;
		      addRowObject = {
			  		test: myInput.input.content, 
			  	    status: result.status ,
			  	    time: execTimeResult ,
			  	    message : "No Error Message",
			  	    response : result.result.skillExecutionInfo.invocationResponse.body.response.outputSpeech.ssml,
			  }

		    }else if(result.status == "IN_PROGRESS"){

		    	addRowObject = {
			  		test: myInput.input.content, 
			  	    status: result.status ,
			  	    time: "Not Defined",
			  	    message : "Please run the test case again",
			  	    response : "Not Defined",
			     }
		    }
			else{

                addRowObject = {
			  		test: myInput.input.content, 
			  	    status: result.status ,
			  	    time: "Not Defined",
			  	    message : result.result.error.message,
			  	    response : "Not Defined",
			     }

			}

		    mainWorkSheet.addRow(addRowObject);

		    setTimeout(function(){ 
              	recursiveTestPromises(noTestRow - 1, myCurrentSkillID);
    		}, 800);      
		}).catch(function(error){
		  console.log("Network Failure. Please check your network connection");
		  mainWorkSheet.commit(); // Need to commit the changes to the mainWorkSheet
          mainWorkBook.commit(); // Finish the workbook
	    });
}





