(function() {
'use strict';

var PlayerService = function($q, $http) {

	var players = this;

	players.playersList = {};

	players.getPlayers = function(id) {
		var deferred = $q.defer();

		$http
		.get('/players/' + id)
		.success(function(response) {
			console.log("playerlist: " + response);			
			players.playersList = response;
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