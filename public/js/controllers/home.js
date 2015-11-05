(function() {
'use strict';

var HomeCtrl = function(player, chart, $timeout) {
	// scope this for inner function contexts
	var that = this,
		steamid,
		recentlyViewed;		

	player.getRecentlyViewed()
	.then(function(response) {		
		recentlyViewed = response;
		var filtered = [];

		function removeDuplicates(objectsArray) {
		    var usedObjects = {};

		    for (var i=objectsArray.length - 1;i>=0;i--) {
		        var so = JSON.stringify(objectsArray[i].name);

		        if (usedObjects[so]) {
		            objectsArray.splice(i, 1);

		        } else {
		            usedObjects[so] = true;          
		        }
		    }

		    return objectsArray;
		}

		var filtered = that.recentlyViewed = removeDuplicates(response);
				
		
	})

	function constructPlayer() {
		
		//get steamID first by resolving username into proper steamID.
		//you cannot search for statistics through the steam API directly
		//with simply a username.
		player.resolveVanityUrl(that.search)
		.then(function(steamid) {
			if(!steamid) {
				if(that.search.slice(0,3) === '765') {
					steamid = that.search;
				} else {
					that.stats = {};
					that.players = {};
					that.stats.noStatsFound = true;
					return;
				}								
			}
			return steamid;			
		})
		.then(function(steamid) {
			steamid = steamid;

			player.getPlayers(steamid)
			.then(function(response) {
				that.players = response;		
			}, function(err, status) {
				that.players = "Error, could not retrieve teams. Error was: " + err;
			})
			.then(function() {
				//get stats for player
				player.getStats(steamid)
				.then(function(stats) {
					//reset stats for new view
					that.stats = {};

					//null object
					if(Object.keys(stats).length == 0) {						
						that.noStats = true;						
						that.stats.message = "Sorry, this user has no data recorded.";
					} else {
						that.noStats = false;
						that.stats = stats;
						
						that.timePlayed = player.getTimePlayed(stats.total_time_played);
						console.dir(stats);
					}

					//set player chart
					var data = [];
					Array.prototype.push.apply(data, [stats.total_kills, stats.total_deaths]);

					//need to set timeout here to avoid
					//"Uncaught IndexSizeError: Failed to execute 'arc' on 'CanvasRenderingContext2D': The radius provided (-0.5) is negative. "
					//error in some instances.
					$timeout(function() {
						chart.setPieChart(data);
					}, 1000);
					

				})

			})
			.then(function() {
				that.favouriteWeapon = '';
				player.getFavouriteWeapon(steamid)
				.then(function(results) {
					that.favouriteWeapon = results[0];					
					return results[1];
				})
				.then(function(weapons) {
					$timeout(function() {
						chart.setKillChart(weapons);
					});					
				})
				.then(function() {
					var user = {
						name: that.players.personaname,
						avatar: that.players.avatarfull,
						profile: that.players.profileurl
					}
					
					player.addRecentlyViewed(user)
					.then(function(response) {

					});
				})
				
			});			

		}) // last then

		
	}
	

	this.constructPlayer = constructPlayer;

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
	.directive('playerMainData', function() {
		return {			
			restrict: 'AE',
			templateUrl: '/public/partials/playerMainData.html',
			replace: true,
			scope: {
				weapon: '=weapon',
				stats: '=stats',
				time: '=time'
			}
		}
	})	
	.directive('recentlyViewed', function() {
		return {			
			restrict: 'AE',
			templateUrl: '/public/partials/recentlyViewed.html',
			replace: true,
			scope: {
				players: '='
			}
		}
	})			
	.controller('HomeCtrl', ['player', 'chart', '$timeout', HomeCtrl])

})();
