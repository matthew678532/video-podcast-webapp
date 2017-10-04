'use strict'

const router = require('express').Router()
const parse = require('./../modules/parse.js')
const url = 'http://rss.cnn.com/services/podcasting/studentnews/rss.xml'

router.get('/', function(req, res, next) {
	parse.parseFeed(url).then(res => {
		return parse.filterFeed(res)
	}).then(feed => {
		res.send(feed)
	}).catch(err => {
		res.send(err)
	})
})

module.exports = router
