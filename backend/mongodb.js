const mongoose = require('mongoose');
const username = 'ryuiyap';
const password = 'aVV5giIcRYRTlEnf';
const db = 'courts'

module.exports = () => {
  const uri = `mongodb+srv://${username}:${password}@courts.yw2rdb6.mongodb.net/${db}?retryWrites=true&w=majority&appName=courts`
  return mongoose.connect(uri).then((e) => {
    console.log('Connected to database!')
  }).catch((e) => {
    console.log(e)
    console.log('Connection failed!')
  })
}