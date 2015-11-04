// Dependencies
var express = require('express');
var router  = express.Router();

// Register Model
var Player = require('./models/players');

// CRUD operations on Team Model
Player.methods(['get', 'put', 'post', 'delete']);

// Register API routes
Player.register(router, '/recentPlayers');

module.exports = router;

