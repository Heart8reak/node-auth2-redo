const db = require('../data/db-config');

module.exports = {
	add,
	find,
	findBy,
	findById,
	remove
};

function find() {
	return db('users').orderBy('id');
}

function findBy(filter) {
	return db('users').where(filter).orderBy('id');
}

async function add(user) {
	const [ id ] = await db('users').insert(user);

	return findById(id);
}

function findById(id) {
	return db('users').where({ id }).first();
}

function remove(id) {
	return db('users').where({ id }).del();
}
