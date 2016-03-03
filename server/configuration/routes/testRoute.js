
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