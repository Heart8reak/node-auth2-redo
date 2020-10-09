const router = require('express').Router();

const Users = require('./users-model');

router.get('/', (req, res) => {
	Users.find()
		.then((users) => {
			res.status(200).json({ message: 'Success', users });
		})
		.catch((err) => {
			res.status(400).json({ message: 'Failed', err });
		});
});

module.exports = router;
