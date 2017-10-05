'use strict'

const fs = require('fs')
const rewire = require('rewire')

const parse = rewire('./../modules/parse.js')
const error = require('./../modules/helpers/error.js').error
const config = require('./../config.js').config

describe('Unit tests for the parse module', function() {
	describe('parseFeed', function() {
		it('Should return an rss feed', done => {

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
					}).catch(err => {
						expect(err).not.toBeDefined()
					}).then(() => {
						done()
					})
			})

		})
	})
})
