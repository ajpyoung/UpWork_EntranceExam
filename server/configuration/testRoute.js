const respond = require(GLOBAL.server_location+'/EventListeners/errorListener');
const parseDataJSON = require(GLOBAL.server_location+'/helpers/parseDataJSON');
var configRoutes = function(dataStruct)
{	
	var router = dataStruct.router;

	router.route('/testEcho/:echo')
		.get(function(req,res){
			
			var msg = {
				"status":"TestRoute",
				"echo":req.params.echo
			};
			res.json(msg);
		});

	return dataStruct;
}


module.exports = {
	configRoutes:configRoutes
};