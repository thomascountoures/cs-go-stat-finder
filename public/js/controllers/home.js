(function() {
'use strict';

var HomeCtrl = function(player, chart) {
	// scope this for inner function contexts
	var that = this;

	function searchPlayer() {
		player.getPlayers(that.search)
		.then(function(response) {
			that.players = response;		
		}, function(err, status) {
			that.players = "Error, could not retrieve teams. Error was: " + err;
		})
		.then(function(results) {
			//get stats for player
			player.getWantedStats(that.search)
			.then(function(stats) {
				//reset stats for new view
				that.stats = {};

				//null object
				if(Object.keys(stats).length == 0) {
					that.noStats = true;
					that.message = "Sorry, this user has no data recorded.";
				} else {
					that.noStats = false;
					that.stats = stats;
				}

				//set player chart
				var data = [];
				Array.prototype.push.apply(data, [stats.total_kills, stats.total_deaths]);
				chart.setPieChart(data);				
												
			})

		})
		.then(function() {
			that.favouriteWeapon = '';
			player.getFavouriteWeapon(that.search)
			.then(function(weapon) {

				that.favouriteWeapon = weapon;
			});
			
		})
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
	.directive('playerStats', function() {
		return {			
			restrict: 'AE',
			templateUrl: '/public/partials/playerStats.html',
			replace: true
		}
	})
	.directive('searchBar', function() {
		return {
			restrict: 'AE',
			templateUrl: '/public/partials/searchBar.html',
			replace: true
		}
	})
	.controller('HomeCtrl', ['player', 'chart', HomeCtrl])

})();
