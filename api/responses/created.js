
module.exports = function (data) {

	this.req._sails.log.silly('Sent (201 CREATED)\n', data);

	return this.res.status(201).send(data)
}
