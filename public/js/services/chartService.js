(function() {
'use strict';

var ChartService = function() {

	var chart = this;	

	this.setPieChart = function(data) {

		if(data instanceof Array) {			
			var dataConfig     = [],
				colors 		   = ["#DC3D24", "#FF5A5E", "#00FF8B"],
				highlights 	   = ["#FF5A5E", "#5AD3D1", "#00FF8B"];						

			//loop through total kills and total deaths and create chart
			angular.forEach(data, function(value, key) {
				var obj = {
					value: value,
					color: colors[Math.floor(Math.random() * colors.length)],
					highlight: highlights[Math.floor(Math.random() * highlights.length)],
					label: "#fff"
				};

				//remove used colours so duplicates won't occur
				var index = colors.indexOf(obj.color);				
				if(index > -1) {
					colors.splice(index, 1);
				}
				
				dataConfig.push(obj);
			});		
			
			var ctx = document.getElementById("myChart").getContext("2d");
			var myDoughnutChart = new Chart(ctx).Doughnut(dataConfig);

		}


	};

	return chart;

}

angular
	.module('battlefy')
	.service('chart', [ChartService]);

})();
