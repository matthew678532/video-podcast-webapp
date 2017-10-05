'use strict'

/**
 * validateId - a function used to ensure a valid
 * id is passed along with a request for a video, to
 * ensure that the video being requested actually exists.
 * @param  {string} id  a string representation of a unique
 * id number.
 * @param  {object} res a response object, returned from a
 * request to an endpoint.
 * @return {object} a promise object. If resolved, an id (number)
 * is returned signifying a specific video from a collection of
 * videos. Otherwise, an error object is returned.
 */
exports.validateId = function(id, res) {
	return new Promise((resolve, reject) => {
		const nId = Number(id)
		if (!(nId > -1) && !(nId < res.data.entries.length + 1)) {
			return reject(Error('Invalid/Out of range parameter'))
		}
		resolve(nId)
	})
}
