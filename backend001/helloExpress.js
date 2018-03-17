const express = require('express')
let app = express()
let port = process.argv[2]

app.get('/home', (request, response) => {
  response.end('Hello World!')
})

app.listen(port)
