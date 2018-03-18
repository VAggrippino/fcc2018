const mongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/learnyoumongo'
const firstName = process.argv[2]
const lastName = process.argv[3]

mongoClient.connect(url, (err, client) => {
  if (err) throw err
  let db = client.db('learnyoumongo')
  let document = { firstName, lastName }

  db.collection('docs').insertOne(document, (err, data) => {
    if (err) throw err
    console.log(JSON.stringify(document))
  })
  client.close()
})
