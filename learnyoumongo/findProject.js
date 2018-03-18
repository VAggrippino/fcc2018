const mongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/learnyoumongo'

mongoClient.connect(url, (err, client) => {
  if (err) throw err
  let db = client.db('learnyoumongo')
  let criteria = {age: { $gt: +process.argv[2] }}
  let projection = {
    name: 1,
    age: 1,
    _id: 0
  }

  let cursor = db.collection('parrots').find(criteria).project(projection)
  cursor.toArray((err, documents) => {
    if (err) throw err
    console.log(documents)
  })

  client.close()
})
