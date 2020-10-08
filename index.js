require('dotenv').config();

const server = require('./api/server');

const PORT = process.env.PORT || 5050;

server.listen(PORT, () => {
	console.log(`\n\n********* Listening on PORT: ${PORT} **********\n\n`);
});
