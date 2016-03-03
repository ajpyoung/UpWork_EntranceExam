
const Promise = require('bluebird');
const util = require('util');

const bodyParser = require('body-parser');
const logger = require('morgan');



const start = function(dataStruct)
{
	//handle post forms
	dataStruct.app.use(bodyParser.json()); // for parsing application/json
	dataStruct.app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
	dataStruct.app.use(logger('dev'));//log http requests
	return Promise.resolve(dataStruct);
};

module.exports={
	start:start
};