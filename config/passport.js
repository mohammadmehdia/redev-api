/**
 * Passport configuration file
 */
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

const EXPIRES_IN_SECONDS =  6 * (60*60)
const EXP_REFRESH_TOKEN = 7 * 24 * (60 * 60)

const SECRET = process.env.tokenSecret || '4ukI0uIVnB3iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM'
const REFRESH_SECRET = process.env.refreshSecret || '6inpZXsacJsaGJZsv61uTZV9I5cMrjLCLmlbmlLKEVGTMrbjuhi0rJbucgjACqgy'
const ALGORITHM = 'HS256'
const ISSUER = 'redev.at'
const AUDIENCE = 'redev.at'

/**
 * Configuration object for local strategy
 */
const LOCAL_STRATEGY_CONFIG = {
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: false
}

/**
 * Configuration object for JWT strategy
 */
const JWT_STRATEGY_CONFIG = {
	secretOrKey: SECRET,
	issuer: ISSUER,
	audience: AUDIENCE,
	passReqToCallback: false,
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
}

const JWT_REFRESH_STRATEGY_CONFIG = {
	secretOrKey: REFRESH_SECRET,
	issuer: ISSUER,
	audience: AUDIENCE,
	passReqToCallback: false,
	jwtFromRequest: ExtractJWT.fromHeader("refresh-token"),
}

/**
 * Triggers when user authenticates via local strategy
 */
const _onLocalStrategyAuth = (email, password, next) => {
	User.findOne({email: email})
		.exec( (error, user) => {
			if (error) return next(error, false, {})
			if (!user) return next(null, false, {
				code: 'E_USER_NOT_FOUND',
				message: "User Not Found!"
			});

			// TODO: replace with new cipher service type
			if (!CipherService.comparePassword(password, user))
				return next(null, false, {
					code: 'E_WRONG_PASSWORD',
					message: 'Password is wrong'
				});
			return next(null, user, {});
		});
}

/**
 * Triggers when user authenticates via JWT strategy
 */
const _onJwtStrategyAuth = (payload, next) => {
	const user = payload.user;
	return next(null, user, {});
}

//passport.use( 'local', new LocalStrategy(LOCAL_STRATEGY_CONFIG, _onLocalStrategyAuth));
passport.use( 'jwt', new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth));
passport.use( 'jwt_refresh', new JwtStrategy(JWT_REFRESH_STRATEGY_CONFIG, _onJwtStrategyAuth));

module.exports.jwtSettings = {
	expiresIn: EXPIRES_IN_SECONDS,
	secret: SECRET,
	algorithm : ALGORITHM,
	issuer : ISSUER,
	audience : AUDIENCE,
	refresh: {
		expiresIn: EXP_REFRESH_TOKEN,
		secret: REFRESH_SECRET,
	},
};
