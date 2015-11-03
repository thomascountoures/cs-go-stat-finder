(function() {
'use strict';

var HomeCtrl = function(player) {
	// scope this for inner function contexts
	var that = this;

	function searchPlayer() {
		player.getPlayers(that.search)
		.then(function(response) {
			that.player = response;
			//that.players = response;		
		}, function(err, status) {
			that.player = "Error, could not retrieve teams. Error was: " + err;
		})
		.then(function(results) {
			player.getStats(that.search)
			.then(function(response) {				
				that.stats = response;			
			});
		});
	}

	this.searchPlayer = searchPlayer;
}


angular
	.module('home', [])

	.config(['$stateProvider', function($stateProvider) {
		$stateProvider.state('home', {
			url: '/home',
			templateUrl: '/app/views/home.html',
			controller: 'HomeCtrl',
			controllerAs: 'home'
		});
	}])

	.directive('teamList', function() {
		return {
			scope: {
				team: "="
			},
			restrict: 'AE',
			templateUrl: '/public/partials/teamList.html',
			replace: true
		}
	})

	.controller('HomeCtrl', ['player', HomeCtrl])

})();
