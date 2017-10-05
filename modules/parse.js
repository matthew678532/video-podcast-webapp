'use strict'

/**
 * Needs to be a var so that rss-parser methods
 * can be accessed and overridden during unit
 * testing.
 */
var parser = require('rss-parser')

const error = require('./helpers/error.js').error

/**
 * parseFeed - a function used to parse an rss
 * feed specified by a url.
 * @param  {string} url the source url of the rss feed.
 * @return {object} a promise object. If resolved an rss
 * feed object will be returned, otherwise an error
 * object.
 */
exports.parseFeed = function(url) {
	return new Promise((resolve, reject) => {
		parser.parseURL(url, (err, res) => {
			if (err) return reject(Error(error.failedToConnect))
			if (!res) return reject(Error(error.failedToParse))

			const feed = res.feed

			if (!feed) return reject(Error(error.failedToParse))

			resolve(feed)
		})
	})
}

/**
 * filterFeed - a function used to filter the
 * parsed rss feed data, to include only the data
 * elements required.
 * @param  {object} feed an object containing only the
 * feed data of an rss feed.
 * @return {object}	a resolved promise object containing
 * a filtered rss feed.
 */
exports.filterFeed = function(feed) {
	return new Promise((resolve, reject) => {
		const filteredFeed = {
			title: feed.title,
			description: feed.description,
			entries: []
		}

		feed.entries.forEach((entry, index) => {
			const title = entry.title
			const description = entry.contentSnippet
			const pubDate = entry.pubDate
			const link = entry.link
			const id = index

			filteredFeed.entries.push({
				title,
				description,
				pubDate,
				link,
				id
			})
		})
		resolve(filteredFeed)
	})
}
