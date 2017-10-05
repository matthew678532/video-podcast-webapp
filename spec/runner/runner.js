'use strict'

const Jasmine = require('jasmine')
const JasmineConsoleReporter = require('jasmine-console-reporter')

const jasmine = new Jasmine()

jasmine.loadConfig({
	"spec_dir": "spec",
	"spec_files": [
		"**/*[sS]pec.js"
	],
	"stopSpecOnExpectationFailure": false
})

const reporter = new JasmineConsoleReporter({
	colors: true,
	cleanStack: true,
	verbosity: 3,
	listStyle: 'indent',
	activity: true
})

jasmine.addReporter(reporter)

jasmine.execute()
