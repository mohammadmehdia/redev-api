/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const EmailAddresses = require('machinepack-emailaddresses')
const Passwords = require('machinepack-passwords')
const {i18n} = require('sails');

module.exports = {

	getUserById: async (req, res) => {
		const id = parseInt(req.param('id', 0))
		const user = await User.findOne({id: id})
		return res.json(user)
	}

	/*
	create: (req, res) => {
		const body = req.body
		EmailAddresses.validate({string: body['email'] ?? ""}).exec({
			error: err => res.serverError(err),
			invalid: () => res.jsonError({
				error: true,
				message: i18n('E_INVALID_EMAIL')
			}),
			success: () => {
				User.create(body).fetch()
					.then(res.ok)
					.catch(res.err)
			}
		})
	}
	 */

};
