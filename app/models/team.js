// Dependencies
var restful  = require('node-restful');
var mongoose = restful.mongoose;

// MongoDB Schema
var TeamSchema = new mongoose.Schema({
	name: String,
	wins: Number,
	losses: Number,
	country: String,
	percent: Number,
	players: [{
		name: String,
		real: String,
		country: String,
		kills: Number,
		time: Number,
		accuracy: Number,
		headshot: Number,
		weapon: String
	}]
});

module.exports = restful.model('Teams', TeamSchema);