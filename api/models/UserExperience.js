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
		companyName: {
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
			columnType: 'date',
			required: true,
			allowNull:false,
		},
		endAt: {
			type: 'string',
			columnType: 'date',
			allowNull:true,
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

		// Relation To Owner (User)
		user: {
			model: 'User'
		}
	},


	customToJSON : function() {
		return _.assign(this, {
			startAt: this.startAt ? new Date(this.startAt).toISOString().slice(0,10) : "",
			endAt: this.endAt ? new Date(this.endAt).toISOString().slice(0,10) : "",
		})
	}


};

