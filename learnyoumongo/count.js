const mongoClient = require('mongodb').MongoClient
const collection = 'parrots'
const database = 'learnyoumongo'
const age = process.argv[2]

const url = `mongodb://localhost:27017/${database}`

mongoClient.connect(url, (err, client) => {
  if (err) throw err
  let db = client.db(database)

  db.collection(collection).count({age: {$gt: +age}}, (err, result) => {
    if (err) throw err
    console.log(result)
    client.close()
  })

  /*
  db.collection(collection).find({}).toArray((err, documents) => {
    if (err) throw err
    console.log(documents)
  })
  client.close()
  */
})
