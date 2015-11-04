// Dependencies
var restful  = require('node-restful');
var mongoose = restful.mongoose;

var PlayerSchema = mongoose.Schema({
	name: String,
	avatar: String,
	profile: String
})

module.exports = restful.model('players', PlayerSchema);