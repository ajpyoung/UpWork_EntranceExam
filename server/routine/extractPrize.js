const Promise = require('bluebird');
const util = require('util');
const Crawler = require('crawler');

const start = function(res)
{
	var c = new Crawler({
	    maxConnections : 10,
	    // This will be called for each crawled page 
	    callback : function (error, result, $) {
	        console.log('got results from page');
	        extractData(error,result,$,res);
	    }
	});
	 
	// Queue just one URL, with default callback 
	c.queue('http://www.powerball.com/pb_home.asp');
};

function extractData(err,retVal,$,res)
{
	try{
		//console.log(retVal.body);
		var targetString = $('td[rowspan="2"][valign="middle"]').find("strong").html();
		console.log(targetString);
		var holder = targetString.split('&#xA0;');
		console.log(holder);
		var numberArray = holder[0].split('$');
		console.log(numberArray);
		var number = numberArray[numberArray.length-1];
		var multiplier = 1000000;
		var millionPattern = new RegExp("million","gi");
		var thousandPattern = new RegExp("thousand","gi");
		var billionPattern = new RegExp("billion","gi");

		if(thousandPattern.test(targetString)==true)
		{
			multiplier = 1000;
		}
		if(millionPattern.test(targetString)==true)
		{
			multiplier = 1000000;
		}
		if(billionPattern.test(targetString)==true)
		{
			multiplier = 1000000000;
		}
		console.log(multiplier);
		var finalNumber = parseFloat(parseFloat(number)*multiplier).toFixed(2);
		var msg = {
			"amount":finalNumber
		};
		res.json(msg);
	}catch(err){
		var msg = {
			"code":err.code||"error extracting data from Powerball prize page",
			"message":err.message||"unknown error occurred",
			"stack":err.stack||null
		};
		res.json(msg);
	}
}

module.exports={
	start:start
};