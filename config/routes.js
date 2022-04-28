/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

	/**
	 *  Auth
	 */
	'POST /auth/login': 'AuthController.login',
	'POST /auth/register': 'AuthController.register',
	'POST /auth/logout': 'AuthController.logout',


};
