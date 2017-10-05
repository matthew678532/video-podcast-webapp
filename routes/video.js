'use strict'

const router = require('express').Router()
const parse = require('./../modules/parse.js')
const video = require('./../modules/video.js')
const util = require('./../modules/helpers/util.js')
const url = 'http://rss.cnn.com/services/podcasting/studentnews/rss.xml'

const parseRss = function(req, res, next) {
	parse.parseFeed(url).then(res => {
		return parse.filterFeed(res)
	}).then(feed => {
		res.data = feed
	}).catch(err => {
		res.err = err
	}).then(() => {
		next()
	})
}

router.use(parseRss)

router.get('/:id', function(req, res, next) {
	util.extractParam(req, 'id').then(id => {
		return video.validateId(id, res)
	}).then(nId => {
		console.log(nId)
		res.send(nId)
	}).catch(err => {
		console.log(err)
		res.send(err)
	}).then(() => {
		res.end()
	})
})

module.exports = router
