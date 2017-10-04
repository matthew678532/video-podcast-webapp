'use strict'

const parser = require('rss-parser')

/**
 * parseFeed - a function used to parse an rss
 * feed specified by a url.
 * @param  {string} url the source url of the rss feed.
 * @return {object}     a promise object. If resolved an
 * rss feed object will be returned, otherwise an error
 * object.
 */
exports.parseFeed = function(url) {
	return new Promise((resolve, reject) => {
		parser.parseURL(url, (err, res) => {
			if (err) return reject(Error('Service unavailable'))
			if (!res) return reject(Error('Invalid response data'))

			const feed = res.feed

			if (!feed) return reject(Error('Invalid feed data'))

			resolve(feed)
		})
	})
}
