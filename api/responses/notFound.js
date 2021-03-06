/**
 * 404 (Not Found) Response
 *
 * The requested resource could not be found but may be available again in the future.
 * Subsequent requests by the client are permissible.
 * Used when the requested resource is not found, whether it doesn't exist.
 */

module.exports = function (data, code, message, root) {
	const response = _.assign({
		code: code || 'E_NOT_FOUND',
		message: message || 'The requested resource could not be found but may be available again in the future',
		data: data || {}
	}, root);

	//this.req._sails.log.silly('Sent (404 NOT FOUND)\n', response);

	return this.res.status(404).json(response);
};
