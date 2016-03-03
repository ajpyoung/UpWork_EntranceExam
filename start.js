const blocked = require('blocked');
const express = require('express');

const util = require('util');

const environmentConfiguration = require(__dirname+'/server/configuration/environment/environmentConfiguration');
const routes = require(__dirname + '/server/configuration/routes/MainRoute');

var MainDataStruct = {
	app:express(),
	router:express.Router(),
	port:7771
};

environmentConfiguration.start(MainDataStruct).then(function(retVal){
	//setup routes
	MainDataStruct = routes.start(retVal);
	//End Configuration of system
	
	GLOBAL.server = MainDataStruct.app.listen(MainDataStruct.port);
	console.log(MainDataStruct.HTTP_location);
	console.log('port:'+MainDataStruct.port);
	blocked(function(ms){
	  console.log('BLOCKED FOR %sms', ms | 0);
	});
	return MainDataStruct;
}).catch(function(err){
	var msg = {
		"code":err.code||"[start:environmentConfiguration:start]Something Went Wrong",
		"message":err.message||"Error Thrown",
		"stack":err.stack||null
	};
	console.log(msg);
});