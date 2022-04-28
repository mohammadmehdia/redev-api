/**
* 500 (Internal Server Error) Response
*
* A generic error message, given when no more specific message is suitable.
* The general catch-all error when the server-side throws an exception.
*/

module.exports = function (data, code, message, root) {
	const response = _.assign({
		code: code || 'E_INTERNAL_SERVER_ERROR',
		message: message || 'Something bad happened on the server',
		data: data || {}
	}, root);

	this.req._sails.log.error('Sent (500 INTERNAL SERVER ERROR)\n', response);

	return this.res.status(500).json(response);
};
