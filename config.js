'use strict'

exports.config = {
	cacheKey: '/@{secret}@/',
	serviceUrl: 'http://rss.cnn.com/services/podcasting/studentnews/rss.xml',
	jasmine: {
  	"spec_dir": "spec",
  	"spec_files": [
    	"**/*-spec.js"
  	],
		"stopSpecOnExpectationFailure": false
	}
}
