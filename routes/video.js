'use strict'

const router = require('express').Router()
const tie = require('./../tie.js')

router.use(tie.parseRss)

router.get('/:id', function(req, res, next) {
	if (res.err) {
		res.render('error', {message: res.err.message})
	} else {
		tie.determineVideo(req, res, (err, data) => {
			try {
				if (err) throw err
				res.render('video', data)
			} catch(err) {
				res.render('error', {message: err.message})
			} finally {
				res.end()
			}
		})
	}
})

module.exports = router
