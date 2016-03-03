const Promise = require('bluebird');
const util = require('util');

const returnLatestSet = require('../../../routine/returnLatestSet');

const configRoutes = function(dataStruct)
{   
    var router = dataStruct.router;

	router.route('/returnLatestSet')
		.get(function(req,res){
			returnLatestSet.start(res);
		});

	return dataStruct;
}


module.exports = {
	configRoutes:configRoutes
};