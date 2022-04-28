/**
 * 204 (NoContent) Response
 *
 * General status code. Most common code used to indicate delete success.
 * The actual response will depend on the request method used.
 */

module.exports = function () {

	//this.req._sails.log.silly('Sent (204 NoContent)\n', response);

	return this.res.status(204).response({});
};
