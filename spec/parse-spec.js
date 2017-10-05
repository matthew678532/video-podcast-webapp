'use strict'

const fs = require('fs')
const rewire = require('rewire')

const parse = rewire('./../modules/parse.js')
const error = require('./../modules/helpers/error.js').error
const config = require('./../config.js').config

describe('Parse module unit tests', function() {
	describe('parseFeed', function() {
		it('Should return a valid rss feed', done => {
			const parserMock = {
				parseURL: function(url, callback) {
					const json = fs.readFileSync(__dirname + '/data/feed.json')
					const parsed = JSON.parse(json.toString())
					return callback(null, parsed)
				}
			}

			parse.__with__({
    		parser: parserMock
			})(function () {
				parse.parseFeed(config.serviceUrl)
					.then(res => {
						expect(res).toBeDefined()
						expect(res.title).toBeDefined()
						expect(res.description).toBeDefined()
						expect(res.entries).toBeDefined()
						expect(typeof res.title).toBe('string')
						expect(typeof res.description).toBe('string')
						expect(Array.isArray(res.entries)).toBe(true)
						res.entries.forEach(entry => {
							expect(entry.title).toBeDefined()
							expect(entry.contentSnippet).toBeDefined()
							expect(entry.link).toBeDefined()
							expect(entry.pubDate).toBeDefined()
							expect(typeof entry.title).toBe('string')
							expect(typeof entry.contentSnippet).toBe('string')
							expect(typeof entry.link).toBe('string')
							expect(typeof entry.pubDate).toBe('string')
						})
					}).catch(err => {
						expect(err).not.toBeDefined()
					}).then(() => {
						done()
					})
			})
		})

		it('Should error if the service is unavailable', done => {
			const parserMock = {
				parseURL: function(url, callback) {
					return callback(Error(error.failedToConnect))
				}
			}

			parse.__with__({
				parser: parserMock
			})(function() {
				parse.parseFeed(config.serviceUrl)
					.then(res => {
						throw new Error('This should not be called!')
					}).catch(err => {
						expect(err).toBeDefined()
						expect(err.message).toBeDefined()
						expect(err.message).toBe(error.failedToConnect)
					}).then(() => {
						done()
					})
			})
		})

		it('Should error if the returned data is not valid', done => {
			const parserMock = {
				parseURL: (url, callback) => callback(null, {})
			}

			parse.__with__({
				parser: parserMock
			})(function() {
				parse.parseFeed(config.serviceUrl)
					.then(res => {
						throw new Error('This should not be called!')
					}).catch(err => {
						expect(err).toBeDefined()
						expect(err.message).toBeDefined()
						expect(err.message).toBe(error.failedToParse)
					}).then(() => {
						done()
					})
			})
		})
	})

	describe('filterFeed', function() {
		it('Should filter out specific data from an rss feed', done => {
			const parserMock = {
				parseURL: function(url, callback) {
					const json = fs.readFileSync(__dirname + '/data/feed.json')
					const parsed = JSON.parse(json.toString())
					return callback(null, parsed)
				}
			}

			parse.__with__({
				parser: parserMock
			})(function() {
				parse.parseFeed(config.serviceUrl)
					.then(res => parse.filterFeed(res))
					.then(feed => {
						expect(feed).toBeDefined()
						expect(feed.title).toBeDefined()
						expect(feed.description).toBeDefined()
						expect(feed.entries).toBeDefined()
						expect(typeof feed.description).toBe('string')
						expect(typeof feed.title).toBe('string')
						expect(Array.isArray(feed.entries)).toBe(true)
						feed.entries.forEach(entry => {
							expect(entry.title).toBeDefined()
							expect(entry.description).toBeDefined()
							expect(entry.pubDate).toBeDefined()
							expect(entry.link).toBeDefined()
							expect(entry.id).toBeDefined()
							expect(typeof entry.title).toBe('string')
							expect(typeof entry.description).toBe('string')
							expect(typeof entry.pubDate).toBe('string')
							expect(typeof entry.link).toBe('string')
							expect(typeof entry.id).toBe('number')
						})
					}).catch(err => {
						expect(err).not.toBeDefined()
					}).then(() => {
						done()
					})
			})
		})
	})
})
