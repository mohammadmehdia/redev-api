/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {

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
	},
	customToJSON: function() {
		return _.omit(this, ['password'])
	}

};

