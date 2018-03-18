const mongoClient = require('mongodb').MongoClient
const database = process.argv[2]
const url = `mongodb://localhost:27017/${database}`

const username = 'tinatime'
const age = 40

mongoClient.connect(url, (err, client) => {
  if (err) throw err
  let db = client.db(database)

  let filter = {username}
  let update = { $set: {age} }

  db.collection('users').updateOne(filter, update)
    .then(result => {
      console.log(result)
    }).then(() => client.close())
})
