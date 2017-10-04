'use strict'

const router = require('express').Router()

router.get('/', function(req, res, next) {
	res.redirect('/video')
})

module.exports = router
