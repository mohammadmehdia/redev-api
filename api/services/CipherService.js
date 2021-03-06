var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports = {
	secret: sails.config.jwtSettings.secret,
	issuer: sails.config.jwtSettings.issuer,
	audience: sails.config.jwtSettings.audience,

	/**
	 * Hash the password field of the passed user.
	 */
	hashPassword: function (user) {
		if (user.password) {
			user.password = bcrypt.hashSync(user.password);
		}
	},

	/**
	 * Compare user password hash with unhashed password
	 * @returns boolean indicating a match
	 */
	comparePassword: function(password, user) {
		return user && user.password && bcrypt.compareSync(password, user.password);
	},

	/**
	 * Create a token based on the passed user
	 * @param user
	 */
	createAccessToken: function(user)
	{
		return jwt.sign({
				user: user,
			},
			sails.config.jwtSettings.secret,
			{
				algorithm: sails.config.jwtSettings.algorithm,
				expiresIn: sails.config.jwtSettings.expiresIn,
				issuer: sails.config.jwtSettings.issuer,
				audience: sails.config.jwtSettings.audience
			}
		);
	},
	/**
	 * Create a refresh token based on the passed user
	 * @param user
	 */
	createRefreshToken: function(user) {
		return jwt.sign({
				user: user,
			},
			sails.config.jwtSettings.refresh.secret,
			{
				algorithm: sails.config.jwtSettings.algorithm,
				expiresIn: sails.config.jwtSettings.refresh.expiresIn,
				issuer: sails.config.jwtSettings.issuer,
				audience: sails.config.jwtSettings.audience
			}
		);
	},
	/**
	 * Create tokens
	 * @param user
	 */
	createToken: function(user) {
		const refreshToken = this.createRefreshToken(user)
		const token = this.createAccessToken(user)
		return {token, refreshToken}
	}
};
