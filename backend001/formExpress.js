const express = require('express')
const bodyparser = require('body-parser')

let port = process.argv[2]

let app = express()
app.use(bodyparser.urlencoded({extended: false}))
app.post('/form', (request, response) => {
  response.end(request.body.str.split('').reverse().join(''))
})

app.listen(port)
