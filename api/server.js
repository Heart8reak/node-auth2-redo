const express = require('express');
const helmet = require('helmet');
// const session = require('express-session');

const errorHandler = require('../api/errorHandler');
const AuthRouter = require('../auth/auth-router');
const UsersRouter = require('../users/user-router');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/auth', AuthRouter);
server.use('/api/users', UsersRouter);

server.get('/', (req, res) => {
	res.json({ message: 'The API Backend is up running' });
});

server.use(errorHandler);

module.exports = server;
