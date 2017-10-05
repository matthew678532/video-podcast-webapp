'use strict'

/**
 * extractParam - a function used to check for
 * the presence of a parameter upon a user
 * request.
 * @param  {object} req   a request object containing
 * details of a users request.
 * @param  {string} param a parameter string that we
 * intend to check the presence of.
 * @return {object} a promise object. If resolved, the
 * value returned will be the value stored within
 * req.params[param], otherwise an error object will
 * be returned.
 */
exports.extractParam = function(req, param) {
	return new Promise((resolve, reject) => {
		if (req.params === undefined) {
			return reject(Error('Invalid parameter'))
		} else if (req.params[param] === undefined) {
			return reject(Error('Invalid parameter'))
		} else {
			resolve(req.params[param])
		}
	})
}
