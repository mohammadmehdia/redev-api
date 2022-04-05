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

module.exports = function err(data, status = 400) {
	// Get access to `req` and `res`
	const req = this.req;
	const res = this.res;

	// Define the status code to send in the response.
	let statusCode = status ?? 400;

	// If no data was provided, use res.sendStatus().
	if (data === undefined) {
		return res.sendStatus(statusCode, {
			error: true,
			message: "",
		});
	}
	if(typeof(data) === 'string') {
		return res.status(statusCode).send({
			error:true,
			message: data,
		})
	}

	if (_.isError(data) && !_.isFunction(data.toJSON)) {
		if (process.env.NODE_ENV === 'production') {
			return res.status(statusCode).send({error: true, message: ""});
		} else {
			return res.status(statusCode).send({error: true, message: data.stack});
		}
	}

	// if(_.isObject(data)) {
	// 	data.error = true
	// 	if(_.isFunction(data.toJSON)) {
	// 		const obj = {error: true, ...data.toJSON() ?? {}}
	// 		return res.status(statusCode).send(obj)
	// 	}
	// }
	return res.status(statusCode).send({error: true, ...data});
};
