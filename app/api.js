// Dependencies
var express = require('express');
var router  = express.Router();

// Register Model
var Team = require('./models/team');

// CRUD operations on Team Model
Team.methods(['get', 'put', 'post', 'delete']);

// Register API routes
Team.register(router, '/teams');

module.exports = router;

