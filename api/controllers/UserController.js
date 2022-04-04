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

	// create: (req, res) => {
	// 	const body = req.body
	// 	EmailAddresses.validate({string: body['email'] ?? ""}).exec({
	// 		error: err => res.serverError(err),
	// 		invalid: () => res.badRequest({
	// 			error: true,
	// 			message: i18n('E_INVALID_EMAIL')
	// 		}),
	// 		success: () => {
	// 			Passwords.encryptPassword({password: body['password']??""}).exec({
	// 				error: err => res.serverError(err),
	// 				success: (encryptedPassword) => {
	// 					body['password'] = encryptedPassword
	// 					User.create(body).fetch()
	// 						.then(result => res.ok(result))
	// 						.catch(err => res.serverError(err))
	// 					//return res.ok({email, password, encryptedPassword});
	// 				}
	// 			})
	// 		}
	// 	})
	// }

};

