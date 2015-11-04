// routes config
module.exports = function(app, express, router, requestify) {

	// server routes ================================
	app.use(router);
	router.get('/players/:id', function(req, res, next) {
		var data;
		requestify
			.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=72793006155C403B2A5F7C0451CA1F29&steamids=' + req.params.id)
			.then(function(response) {
				data = response.getBody();								
				res.send(data.response.players);
				next();
			});
	});

	router.get('/players/stats/:id', function(req, res) {
		requestify
			.get('http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=72793006155C403B2A5F7C0451CA1F29&steamid=' + req.params.id)
			.then(function(response) {				
				var stats = response.getBody();
				console.dir(stats);
				//data.append(stats.gameName);
				res.send(stats.playerstats.stats);
			});
	})	

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
