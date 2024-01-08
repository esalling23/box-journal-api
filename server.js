'use strict'

const express = require('express'),
      app = express(),
      router = express.Router(),
      cors = require('cors'),
      mongoose = require('mongoose'),
      Box = require('./api/models/Box'),
      bodyParser = require('body-parser'),
      port = process.env.PORT || 8080

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/BoxDB');

// todo - add node clusters

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const boxRoutes = require('./api/routes/boxRoutes');
const trackerRoutes = require('./api/routes/trackerRoutes');
const boxTrackerRoutes = require('./api/routes/boxTrackerRoutes');
const userRoutes = require('./api/routes/userRoutes')

boxRoutes(app)
trackerRoutes(app)
boxTrackerRoutes(app)

app.use(userRoutes)

app.listen(port)

console.log(`Box Journal Api Running at Port ${port}`)
