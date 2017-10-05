'use strict'

const cache = require('memory-cache')

const parse = require('./modules/parse.js')
const video = require('./modules/video.js')
const util = require('./modules/helpers/util.js')
const config = require('./config.js').config

/**
 * parseRss - a middleware function used to parse a
 * specified rss feed either from an in-memory cache
 * or via a service provider.
 * @param  {object} req  a request object containing
 * details of a users request.
 * @param  {object} res  a response object containing
 * the return data of a request.
 * @param  {object} next a function used to invoke the
 * next middleware function in chain of middleware
 * functions.
 * @return {object} a response object containing
 * some alterations which can be accessed within
 * subsequent middleware functions.
 */
exports.parseRss = function(req, res, next) {
	const key = `__express__${config.cacheKey}`
	const duration = 300000
	const cachedFeed = cache.get(key)
	if (cachedFeed) {
		res.data = cachedFeed
		next()
	} else {
		parse.parseFeed(url).then(res => {
			return parse.filterFeed(res)
		}).then(feed => {
			cache.put(key, feed, duration)
			res.data = feed
		}).catch(err => {
			res.err = err
		}).then(() => {
			next()
		})
	}
}

/**
 * determineVideo - a callback function used to
 * invoke a chain of promises and 'callback' the
 * resulting data.
 * @param  {object} req      a request object containing
 * information regarding a users request.
 * @param  {object} res      a response object containing
 * the subsequent return data of a request.
 * @param  {object} callback a reference to a callback
 * function.
 * @return {object} a callback function to handle return
 * data.
 */
exports.determineVideo = function(req, res, callback) {
	util.extractParam(req, 'id')
		.then(id => video.validateId(id, res))
		.then(id => video.getVideo(id, res))
		.then(res => callback(null, res.data))
		.catch(err => callback(err))
}
