const express = require('express')

const app = express()
const port = process.argv[2]

console.log(port)

app.param('id', (request, response, next, id) => {
  if (id) {
    request.id = id
    next()
  } else {
    next(new Error('No message ID'))
  }
})

app.put('/message/:id', (request, response) => {
  let dateHash = require('crypto')
    .createHash('sha1')
    .update(new Date().toDateString() + request.id)
    .digest('hex')
  response.end(dateHash)
})

app.listen(port)
