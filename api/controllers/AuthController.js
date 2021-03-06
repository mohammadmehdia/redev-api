/**
 * Auth Controller
 */

const {i18n} = require('sails');
const passport = require("passport");


module.exports = {

	register: (req, res) => {
		User.create(_.omit(req.allParams(), 'id'))
			.fetch()
			.then(res.created)
			.catch(res.serverError);
	},

	login: (req, res) => {
		const email = req.body.email || ""
		const password = req.body.password || ""
		User.findOne({email})
			.then(user => {

				if(user &&  CipherService.comparePassword(password, user) ) {
					return res.ok(_.assign( CipherService.createToken(user),
						{
							user: user
						}
					));
				} else {
					const message = i18n('E_INVALID_CREDENTIALS')
					return res.badRequest(null, "E_INVALID_CREDENTIALS", message)
				}
			})
			.catch(err => {
				console.error(err)
				const message = i18n('E_INVALID_CREDENTIALS')
				return res.badRequest(null, "E_INVALID_CREDENTIALS", message)
			})
	},

	refreshToken: (req, res) => {
		const user = req.user
		return res.ok( _.assign(
			CipherService.createToken(user),
			{user}
		))
	}

};
