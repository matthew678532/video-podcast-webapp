'use strict'

const error = require('./helpers/error.js').error

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
			return reject(Error(error.invalidParam))
		}
		resolve(nId)
	})
}

/**
 * getVideo - a function used to match
 * a requested video by id, to the actual video
 * within a collection by setting the state of
 * the video to active (if matched), or inactive
 * (if not matched). Once modified the response object
 * is returned.
 * @param  {number} id  a video id.
 * @param  {object} res a response object containing
 * some rss feed data.
 * @return {object} a promise object returning the rss
 * feed response data after alterations.
 */
exports.getVideo = function(id, res) {
	return new Promise((resolve, reject) => {
		res.data.entries.forEach(entry => {
			if (id === entry.id) {
				entry.state = 'active'
			} else {
				entry.state = 'inactive'
			}
		})
		resolve(res)
	})
}
