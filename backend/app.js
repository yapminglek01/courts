const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var cors = require('cors');
const allowedOrigins = ['http://localhost:4200'];
app.use(cors({
  origin: function (origin, callback) {
    // Check if the origin is allowed or is undefined (e.g., direct fetch from Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));


app.use(bodyParser.json({ limit: '10mb' }));

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