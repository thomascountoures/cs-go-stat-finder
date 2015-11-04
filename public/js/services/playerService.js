(function() {
'use strict';

var PlayerService = function($q, $http) {

	var players = this;
	
	players.resolveVanityUrl = function(username) {
		var deferred = $q.defer();

		$http
		.get('/getSteamID/' + username)
		.success(function(steamID) {
			deferred.resolve(steamID);
		}, function(err, status) {
			deferred.reject(err);
		})


		return deferred.promise;
	};

	players.getPlayers = function(id) {
		var deferred = $q.defer();

		$http
		.get('/players/' + id)
		.success(function(response) {			
			
			deferred.resolve(response[0]);
		}, function(err, status) {
			deferred.reject(err);
		});
		

		return deferred.promise;
	};

	players.getStats = function(id) {
		var deferred = $q.defer();

		$http
		.get('/players/stats/' + id)
		.success(function(stats) {			

			//the steam api feedback for stats has pretty bad key-value pairs...
			var wanted_stats = ['total_kills', 'total_deaths', 'total_wins', 'total_damage_done', 'total_money_earned', 'total_kills_knife'],
				newStats	 = {};
			
			//add values I want to have in the stats charts
			for(var i = 0, length = stats.length, results = []; i < length; i++) {				
				var currentStatName  = stats[i].name,
					currentStatValue = stats[i].value;										

				//if(wanted_stats.indexOf(currentStatName) !== -1) {					
					newStats[currentStatName] = currentStatValue;					
				//}
			}
						
			deferred.resolve(newStats);

		}, function(err, status) {
			deferred.reject(err);
		});

		return deferred.promise;
	};

	players.getFavouriteWeapon = function(id) {
		
		var deferred = $q.defer();

		$http
		.get('/players/stats/' + id)
		.success(function(stats) {					
			if(stats instanceof Array) {
				var highest = 0,
					weaponList = [],					
					bestWeapon,
					sendBack = [];

				angular.forEach(stats, function(value, i) {					
					var obj = value;
										
					for(var key in obj) {				
						if(obj.hasOwnProperty(key)) {
							var weapon = obj.name,
								kills  = obj.value,
								unwanted = ['against', 'enemy', 'headshot'];							
							//need extra _ so I don't get total kills proper							
							if(weapon.indexOf('total_kills_') !== -1 && !weapon.match(/(against|enemy|headshot)/)) {
								weaponList.push({
									weapon: weapon,
									kills: kills
								});
								if(kills > highest) {
									highest = kills;
									bestWeapon = weapon.slice(12);									
								}
							}
							
						}
					}
				});
				Array.prototype.push.apply(sendBack, [bestWeapon, weaponList]);
				deferred.resolve(sendBack);

			} else {
				deferred.reject();
			}			

		});

		return deferred.promise;

	};

	players.getTimePlayed = function(seconds) {		
		var hours   = parseInt(seconds / 3600),
			minutes = parseInt(seconds / 60) % 60,
			seconds = seconds % 60;

		return (hours < 10 ? "0" + hours : hours) 
				 + "h" + (minutes < 10 ? "0" + minutes : minutes) 
				 + "m";
	};

	players.addRecentlyViewed = function(user) {
		// send back user object and save in database
		var deferred = $q.defer();				
		
		$http
		.post('/api/recentPlayers', user)
		.success(function(response) {
			deferred.resolve(response);
		}, function(err, status) {
			deferred.reject(err);
		});


		return deferred.promise;

	};

	players.getRecentlyViewed = function() {
		var deferred = $q.defer();

		$http
		.get('/api/recentPlayers')
		.success(function(response) {			
			deferred.resolve(response);
		}, function(err, status) {
			deferred.reject(err);
		});

		return deferred.promise;
	}

	return players;

}

angular
	.module('battlefy')
	.service('player', ['$q', '$http', PlayerService]);


})();