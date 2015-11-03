// Dependencies ==============================
var express    = require('express');
var router	   = express.Router();
var requestify = require('requestify');
var path	   = require('path');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var config 	   = require('./config/db');
var app		   = express();

// Configuration =============================

// use bodyParser for reading POST body
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));

// config file
var db = require('./config/db');

// set up port
var port = process.env.PORT || 8000;

// connect to database
mongoose.connect(db.url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
  console.log("db is open yay");
});

// Routes
require('./app/routes')(app, express, router, requestify);


// Start app =============================
app.listen(port, function() {
	console.log("Server running, listening on port: " + port);	
});

// Expose app ============================
exports = module.exports = app;