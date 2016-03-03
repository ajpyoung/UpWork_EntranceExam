const test = require(__dirname+'/testRoute');
const getPowerBallPrize = require(__dirname+'/subRoutes/getPowerBallPrize');
const getPowerBallSummary = require(__dirname+'/subRoutes/getPowerBallSummary');

var start = function(dataStruct)
{
	dataStruct = getPowerBallPrize.configRoutes(dataStruct);
	dataStruct = getPowerBallSummary.configRoutes(dataStruct);
	dataStruct = test.configRoutes(dataStruct);
	// REGISTER OUR ROUTES -------------------------------
	// all of our routes will be from root /
	dataStruct.app.use('/', dataStruct.router);
	return dataStruct;
}

module.exports = {
	start:start
};