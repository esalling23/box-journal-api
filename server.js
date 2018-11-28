'use strict'

const express = require('express'),
      app = express(),
      router = express.Router(),
      cors = require('cors'),
      port = process.env.PORT || 3000

app.listen(port)

app.use(cors());

console.log(`Box Journal Api Running at Port ${port}`)
