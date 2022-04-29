/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt-nodejs');


module.exports = {
	attributes: {
		updatedAt: false,
		createdAt: false,
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
		},
		username: {
			type: 'string',
			unique: true,
			allowNull: true,
		},
		avatar: {
			type: 'string',
			allowNull: true,
		},
		bio: {
			type: 'string',
			allowNull: true,
			columnType: 'mediumText',
		},
	},

	// Hash Password Before Create|Update
	beforeUpdate: (values, next) => {
		CipherService.hashPassword(values)
		next()
	},
	beforeCreate: (values, next) => {
		CipherService.hashPassword(values);
		next();
	},

	customToJSON: function() {
		return _.omit(this, ['password'])
	},

	experience: {
		collection: 'user_experience',
		via: 'user',
	}


};

