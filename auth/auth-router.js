const brcyptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const Users = require('../users/users-model');
const { isValid } = require('../users/users-service');

router.post('/register', (req, res) => {
	const credentials = req.body;

	if (isValid(credentials)) {
		console.log('CREDENTIALS ====>', credentials);
		const rounds = process.env.BCRYPT_ROUNDS ? parseInt(process.env.BCRYPT_ROUNDS) : 8;
		console.log('ROUNDS ===>', rounds);
		const hash = brcyptjs.hashSync(credentials.password, rounds);
		console.log('HASH ==>', hash);
		credentials.password = hash;
		const user = Users.add(credentials);
		console.log('NEW USER =>', user);
		const token = generateToken(user);
		console.log('TOKEN =>', token);
		res.status(201).json({ message: 'Success', user, token });
	} else {
		next({ apiCode: 400, apiMessage: 'You need username or password' });
	}
});

router.post('/login', (req, res) => {
	const { username, password } = req.body;

	if (isValid(req.body)) {
		Users.findBy({ username: username }).then(([ user ]) => {
			if (user && brcyptjs.compareSync(password, user.password)) {
				const token = generateToken(user);
				res.status(200).json({ message: `Welcome ${username} to our Backend API`, token: token });
			} else {
				res.status(401).json({ message: 'Incorrect credentials' });
			}
		});
	}
});

function generateToken(user) {
	const payload = {
		subject: user.id,
		username: user.username,
		role: user.role
	};
	const secret = process.env.JWT_SECRET || 'May the force be with you';
	const options = {
		expiresIn: '1d'
	};
	const token = jwt.sign(payload, secret, options);
	return token;
}

module.exports = router;
