/**
 * Company.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
		updatedAt: false,
		createdAt: false,
		name: {
			type: 'string',
			required: true,
		},
		email: {
			type: 'string',
			unique: true,
			required: true,
			isEmail: true,
		},
		password: {
			type: 'string',
			required: true,
			minLength: 6,
			encrypt: true,
		},
		isVerifiedByAdmin: {
			type: 'boolean',
			defaultsTo: false,
		},
		logo: {
			type: 'string',
			allowNull: true,
		},
		country: {
			type: 'string',
		},
		city: {
			type: 'string',
		},
		state: {
			type: 'string',
		},
		about: {
			type: 'string',
			allowNull: true,
			columnType: 'longText',
		},
	},
	customToJSON: function() {
		return _.omit(this, ['password', 'email'])
	}

};

