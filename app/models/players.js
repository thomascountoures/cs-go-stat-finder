// Dependencies
var express	 	= require('express');
var router 	 	= express.Router();
var requestify  = require('requestify');

router.get('/players/:id', function(req, res) {
	var id = id;
	requestify
		.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=72793006155C403B2A5F7C0451CA1F29&steamids=' + id)
		.then(response) {
			var data = response.getBody();
		}

	res.send(data);
})

module.exports = router;