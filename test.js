'use strict'

const parse = require('./modules/parse.js')
const url = 'http://rss.cnn.com/services/podcasting/studentnews/rss.xml'

parse.parseFeed(url).then(res => {
	console.log(res)
}).catch(err => {
	console.log(err)
})
