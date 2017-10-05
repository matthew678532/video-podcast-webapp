'use strict'

const router = require('express').Router()
const parse = require('./../modules/parse.js')
const url = 'http://rss.cnn.com/services/podcasting/studentnews/rss.xml'

const parseRss = function(req, res, next) {
	parse.parseFeed(url).then(res => {
		return parse.filterFeed(res)
	}).then(feed => {
		res.data = feed
	}).catch(err => {
		res.err = err
	})
}

router.use(parseRss)

router.get('/', function(req, res, next) {

})

module.exports = router
