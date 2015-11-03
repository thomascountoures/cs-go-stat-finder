module.exports = function(grunt) {	

	grunt.initConfig({

		nodemon: {
		  dev: {
		    script: './server.js'
		  }
		},

        sass: {
        	dist: {
        		files: {
        			'../client/app/assets/css/style.css' : '../client/app/assets/css/style.scss'
        		}
        	}
        }

	}); 
	
	//reloads server.js file when changed
	grunt.loadNpmTasks('grunt-nodemon');	
	grunt.loadNpmTasks('grunt-contrib-sass');

	//define default grunt task
	grunt.registerTask('default', ['nodemon', 'sass']);

}