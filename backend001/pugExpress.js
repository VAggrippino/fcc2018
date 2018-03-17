const express = require('express')
const path = require('path')

let port = process.argv[2]
let file = process.argv[3]

let app = express()

app.set('views', path.join(__dirname, 'templates'))
app.set('view engine', 'pug')
app.get('/home', (request, response) => {
  response.render('index', {date: new Date().toDateString()})
})

app.listen(port)
