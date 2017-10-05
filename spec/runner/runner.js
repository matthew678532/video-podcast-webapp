'use strict'

const config = require('./../../config.js').jasmine
const Jasmine = require('jasmine')
const JasmineConsoleReporter = require('jasmine-console-reporter')

const jasmine = new Jasmine()

jasmine.loadConfigFile(config)

const reporter = new JasmineConsoleReporter({
	colors: true,
	cleanStack: true,
	verbosity: 3,
	listStyle: 'indent',
	activity: true
})

jasmine.addReporter(reporter)

jasmine.execute()
