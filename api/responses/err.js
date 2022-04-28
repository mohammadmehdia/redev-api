/**
 * err.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.err();
 *     // -or-
 *     return res.err(data);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'err'
 *       }
 *     }
 * ```
 *
 * ```
 *     throw 'somethingHappened';
 *     // -or-
 *     throw { somethingHappened: data }
 * ```
 */

module.exports = function err(data, status = 400, code = undefined) {
	const response = {
		code: code || "ERROR",
		message: data === undefined ? "" : (typeof(data) === 'string') ? data :
					(_.isError(data) && !_.isFunction(data.toJSON) && process.env.NODE_ENV !== 'production') ? data.stack : "",
		data: data || {},
	}
	return this.res.status(status || 400).json(response)
};
