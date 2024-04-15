const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var cors = require('cors');

// connect to the database
require('./mongodb')()

app.use(bodyParser.json())
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
})

app.get('/', async (req, res) => {
  res.status(200).send(`Hello World`)
})

app.use('/api', require('./routes'))




module.exports = app;