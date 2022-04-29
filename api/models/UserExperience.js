/**
 * UserExperience.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
	tableName: 'user_experience',

	attributes: {
		updatedAt: false,
		createdAt: false,
		title: {
			type: 'string',
			required: true,
		},
		company: {
			type: 'string',
			allowNull: true,
		},
		location: {
			type: 'string',
			allowNull: true,
		},
		description: {
			type: 'string',
			allowNull: true,
			columnType: 'longText',
		},
		startAt: {
			type: 'string',
			allowNull: false,
			required: true,
			columnType: 'date',
		},
		endAt: {
			type: 'string',
			allowNull: true,
			columnType: 'date',
		},
		isCurrentlyWorking: {
			type: 'boolean',
			allowNull: false,
			defaultsTo: false,
		},
		headline: {
			type: 'string',
			allowNull: true,
		},
	},

	user: {
		model: 'user'
	}

};

