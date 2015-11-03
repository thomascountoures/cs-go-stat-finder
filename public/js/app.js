// global app.js
(function() {
'use strict';

angular
	.module('battlefy', [
		'ui.router',
		'home'
	])

	.config([
		'$urlRouterProvider',		
		function($urlRouterProvider) {
			$urlRouterProvider
				.otherwise('/home');			
		}

	]);

})();