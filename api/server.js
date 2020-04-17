const express = require('express');
const middle = require('./middleware/middleware.js');

const logger = middle.logger;
const server = express();

server.use(logger, express.json());

const recipes = require('./routers/recipes-router');

server
	.route('/')
	.get((req, res) => {
		res.send(`Ludicrous speed, GO!`);
	});

server.use('/api/recipes', recipes);
server.use('/recipes', recipes);

module.exports = server;
