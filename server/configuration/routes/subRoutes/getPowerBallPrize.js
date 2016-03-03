const Promise = require('bluebird');
const util = require('util');

const extractPrize = require('../../../routine/extractPrize');

const configRoutes = function(dataStruct)
{   
    var router = dataStruct.router;

	router.route('/getPowerBallPrize')
		.get(function(req,res){
			extractPrize.start(res);
		});

	return dataStruct;
}


module.exports = {
	configRoutes:configRoutes
};