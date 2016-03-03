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
	c.queue('http://www.powerball.com/powerball/winnums-text.txt');
};

function extractData(err,retVal,$,res)
{
	//console.log(retVal.body);
	var targetString = retVal.body;
	var newString = targetString.replace(/\r\n/g,"\n");
	newString = newString.replace(/((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})\s\s/gi, '');
	var holder = newString.split("\n");
	holder.shift();
	holder.pop();
	var msg = {
		"data":JSON.parse(JSON.stringify(holder))
	};
	res.json(msg);
}

module.exports={
	start:start
};