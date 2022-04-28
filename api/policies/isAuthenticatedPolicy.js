const passport = require('passport');

module.exports = function (req, res, next) {
	passport.authenticate('jwt', undefined, function (error, user, info) {
		if (error) return res.serverError(error);
		if (!user)
			return res.unauthorized(null, info && info.code, info && info.message);
		req.user = user;

		next();
	})(req, res);
};
