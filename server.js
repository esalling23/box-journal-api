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

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const routes = require('./api/routes/boxRoutes'); //importing route
routes(app); //register the route

app.listen(port)

console.log(`Box Journal Api Running at Port ${port}`)
