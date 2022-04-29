/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

const { faker } = require('@faker-js/faker');

const seedData = (count, seedDataFn) => {
	return [...Array(count).keys()].map(( _, idx) => seedDataFn(idx))
}

module.exports.bootstrap = async function() {

	// By convention, this is a good place to set up fake data during development.
	//
	// For example:
	// ```
	// // Set up fake development data (or if we already have some, avast)


	await User.createEach(seedData(10, idx => ({
			email: faker.internet.email(),
			password: '123456',
			username: faker.internet.userName(),
			avatar: faker.internet.avatar(),
			bio: faker.lorem.sentence(16),
		})
	))


	// ```

};
