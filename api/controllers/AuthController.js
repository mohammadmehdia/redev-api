/**
 * Auth Controller
 */

const passport = require('passport');
const {i18n} = require('sails');

function _onPassportAuth(req, res, error, user, info) {
	if (error) return res.serverError(error);
	if (!user) return res.unauthorized(null, info && info.code, info && info.message);

	return res.ok({
		token: CipherService.createToken(user),
		user: user
	});
}

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
				console.log("user, ", user)
				if( CipherService.comparePassword(password, user) ) {
					return res.ok({
						token: CipherService.createToken(user),
						user: user
					});
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
		return res.ok(req.user)
	}

};
