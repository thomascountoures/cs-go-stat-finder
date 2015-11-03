// routes config
module.exports = function(app, express, router, requestify) {

	// server routes ================================
	app.use(router);
	router.get('/players/:id', function(req, res) {
		var id = req.params.id;
		var data;
		requestify
			.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=72793006155C403B2A5F7C0451CA1F29&steamids=' + id)
			.then(function(response) {
				data = response.getBody();
				console.dir(data.response.players);	
				res.send(data.response.players);			
			});
	});	

	app.use('/api', require('./api'));
	


	// client routes ================================
	app.use('/bower_components', express.static(__dirname + '/../bower_components'));
	app.use('/public', express.static(__dirname + '/../public'));
	app.use('/app', express.static(__dirname + '/../app'));

	// all other routes ==============================
	app.get('/', function(req, res) {
		res.sendFile(__dirname + '/views/index.html');
	});

}
