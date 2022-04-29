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
const {email} = require("sails-hook-orm/constants/deprecated-validations.list");

const seedData = (count, seedDataFn) => {
	return [...Array(count).keys()].map(( _, idx) => seedDataFn(idx))
}

const JOB_TITLES = [
	"Android Developer",
	"iOS Developer",
	"ReactJS Developer",
	"AngularJS Developer",
	"Python Expert",
	"Django Developer",
	"UI/UX Designer",
	"Mobile App Desinger",
]

module.exports.bootstrap = async function() {

	await User.create({
		email: "test@test.com",
		password: "123456",
		username: "mimdev",
		avatar: faker.internet.avatar(),
		bio: faker.lorem.sentence(10),
	})

	await User.createEach(seedData(10, idx => ({
			email: faker.internet.email(),
			password: '123456',
			username: faker.internet.userName(),
			avatar: faker.internet.avatar(),
			bio: faker.lorem.sentence(16),
		})
	))

	await UserExperience.createEach(seedData(20, idx => ({
			title: faker.random.arrayElement(JOB_TITLES),
			companyName:faker.company.companyName(),
			location:faker.address.cityName(),
			description:faker.lorem.paragraph(3),
			isCurrentlyWorking:faker.datatype.boolean(),
			startAt: faker.date.between("2016-01-01", "2017-01-01").toISOString().slice(0,10),
			endAt: faker.date.between("2017-01-01", "2017-06-06").toISOString().slice(0,10),
			headline: faker.random.arrayElement(JOB_TITLES),
			user: faker.datatype.number({min: 1, max:10}),
		})
	))
};
