'use strict'

const router = require('express').Router()
const cache = require('memory-cache')
const parse = require('./../modules/parse.js')
const video = require('./../modules/video.js')
const util = require('./../modules/helpers/util.js')
const url = 'http://rss.cnn.com/services/podcasting/studentnews/rss.xml'

const parseRss = function(req, res, next) {
	const key = '__express__@secret@'
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

router.use(parseRss)

router.get('/:id', function(req, res, next) {
	if (res.err) {
		res.render('error', {message: res.err.message})
	} else {
		util.extractParam(req, 'id').then(id => {
			return video.validateId(id, res)
		}).then(id => {
			return video.specifyVideo(id, res)
		}).then(res => {
			res.render('video', res.data)
		}).catch(err => {
			res.render('error', err.message)
		}).then(() => {
			res.end()
		})
	}
})

module.exports = router
