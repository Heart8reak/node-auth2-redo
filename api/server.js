const express = require('express');
const helmet = require('helmet');
// const session = require('express-session');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
	res.json({ message: 'The API Backend is up running' });
});

module.exports = server;
