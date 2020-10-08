const cleaner = require('knex-cleaner');

function cleanTables(knex) {
	return cleaner
		.clean(knex, {
			mode: 'truncate',
			restartIdentity: true,
			ignoreTable: [ 'knex_migrations', 'knex_migrations_lock' ]
		})
		.then(() => console.log('\n== All table truncated, ready to seed ==\n'));
}

exports.seed = function(knex) {
	if (knex.client.config.client === 'sqlite') {
		return knex.raw('PRAGMA foreign_keys = OFF').then(() => cleanTables(knex));
	} else {
		return cleanTables(knex);
	}
};
