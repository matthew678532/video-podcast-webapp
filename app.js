'use strict'

const express = require('express')
const path = require('path')
const routes = {
	index: require('./routes/index.js'),
	video: require('/routes/video.js')
}

const app = express()
const port = process.env.PORT || 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes.index)
app.use('/video', routes.video)

app.listen(port, err => console.log(err || `App running on port ${port}`))
