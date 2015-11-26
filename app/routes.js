// routes config
module.exports = function(app, express, router, requestify) {

	// ENTER YOUR STEAM API KEY HERE
	var API_KEY = '';

	// server routes ================================
	app.use(router);
	router.get('/players/:id', function(req, res, next) {
		var data;
		requestify
			.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key='+ API_KEY + '&steamids=' + req.params.id)
			.then(function(response) {				
				data = response.getBody();								
				res.send(data.response.players);
				next();
			});
	});

	router.get('/players/stats/:id', function(req, res) {
		requestify
			.get('http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=' + API_KEY + '&steamid=' + req.params.id)
			.then(function(response) {				
				var stats = response.getBody();
				console.dir(stats);
				//data.append(stats.gameName);
				res.send(stats.playerstats.stats);
			});
	});

	router.post('/players/recentlyViewed', function(req, res, next) {
		var Player = require('./models/players');
		var p1 = new Player(req.body);
		p1.save(function(err, result) {
			res.json(result);			
		})
		next();
	});

	router.get('/getSteamID/:username', function(req, res) {
		requestify
			.get('http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=' + API_KEY + '&vanityurl=' + req.params.username)
			.then(function(response) {
				var result = response.getBody();
				console.dir(result.response.steamid);
				res.send(result.response.steamid);
			})
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
