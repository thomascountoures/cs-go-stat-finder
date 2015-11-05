(function() {
'use strict';

var ChartService = function() {

	var chart = this;	

	this.setPieChart = function(data) {

		if(data instanceof Array) {			
			var dataConfig     = [],
				colors 		   = ["#00FF8B", "#DC3D24"],
				highlights 	   = ["red", "green", "#00FF8B"],
				labels		   = ["Kills", "Deaths"],
				label 		   = 0;

			//loop through total kills and total deaths and create chart
			angular.forEach(data, function(value, key) {				
				var obj = {
					value: value,
					color: colors[Math.floor(Math.random() * colors.length)],
					highlight: highlights[Math.floor(Math.random() * highlights.length)],
					label: labels[key]
				};

				//remove used colours so duplicates won't occur
				var index = colors.indexOf(obj.color);				
				if(index > -1) {
					colors.splice(index, 1);
				}				
				dataConfig.push(obj);
			});		
			
			var ctx = document.getElementById("myChart").getContext("2d");
			var myPieChart = new Chart(ctx).Pie(dataConfig, {
				segmentShowStroke : false,
				maintainAspectRatio: false				
			});

		}


	};

	this.setKillChart = function(data) {

		if(data instanceof Array) {
			
			var dataConfig     		= {},				
				colors 		   		= ["#00FF8B", "#DC3D24"],
				highlights 	   		= ["red", "green", "#00FF8B"],
				weapons				= [],
				killsListByWeapon	= [],
				datasets 			= [],
				label,
				weaponObjectData,
				currentValue,
				currentObject,
				weapon,
				kills,				
				loopCount = 0;

			dataConfig.datasets = [];
			
			
			// sort weapons, I'm looking for top weapons by kills
			data.sort(function(a, b) {
				return parseFloat(b.kills) - parseFloat(a.kills);
			});
			

			// loop through total kills and total deaths and create chart
			// of top 10 weapons


			for(var key = 0, length = 9, duplicate = false; key <= length; key++) {
				currentObject = data[key];
				weapon = currentObject.weapon.slice(12);
				kills = currentObject.kills;
								
				if(weapons.indexOf(weapon) == -1) {
					weapons.push(weapon);
				} else {
					duplicate = true;
				}
				

				//get kill data
				if(killsListByWeapon.indexOf(kills) == -1) {
					killsListByWeapon.push(kills);
				}				
				
				weaponObjectData = {
					label: weapon,
		            fillColor: "#DC3D24",
		            strokeColor: "#E3AE57",
		            highlightFill: "rgba(220,220,220,0.75)",
		            highlightStroke: "rgba(220,220,220,1)"		            
				};

				if(duplicate == false && datasets.length <= 4) {
					datasets.push(weaponObjectData);
				}
				

				weaponObjectData = {};
			}			

			// get chart data ready to go
			dataConfig.datasets = datasets;
			dataConfig.datasets[0].data = killsListByWeapon;
			dataConfig.labels = weapons;
			console.dir(dataConfig);
			
			var ctx = document.getElementById("barChart").getContext("2d");
			var myDoughnutChart = new Chart(ctx).Bar(dataConfig);



		}

	}

	return chart;

}

angular
	.module('battlefy')
	.service('chart', [ChartService]);

})();
